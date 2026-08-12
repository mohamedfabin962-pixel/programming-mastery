import { prisma } from '../lib/prisma.js';
import { NotFoundError, ConflictError, BadRequestError } from '../utils/errors.js';
import {
  CreateNodeInput,
  UpdateNodeInput,
  AddPrerequisiteInput,
} from '../validation/learningNode.js';
import { NodeStatus } from '@prisma/client';

export interface GraphNodeResponse {
  id: string;
  slug: string;
  title: string;
  description: string;
  region: string;
  nodeType: string;
  positionX: number;
  positionY: number;
  icon: string | null;
  courseId: string | null;
  lessonId: string | null;
  isPublished: boolean;
  status: NodeStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface GraphEdgeResponse {
  id: string;
  nodeId: string;
  prerequisiteId: string;
  isMandatory: boolean;
}

/**
 * BFS graph traversal to check if a path exists from startNodeId to targetNodeId.
 * Used to detect cycles in the prerequisite Directed Acyclic Graph (DAG).
 */
export async function hasPath(startNodeId: string, targetNodeId: string): Promise<boolean> {
  if (startNodeId === targetNodeId) {
    return true;
  }

  const visited = new Set<string>();
  const queue: string[] = [startNodeId];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current === targetNodeId) {
      return true;
    }

    if (visited.has(current)) {
      continue;
    }
    visited.add(current);

    // Fetch all nodes that depend on `current` (where current is a prerequisite)
    const dependentEdges = await prisma.nodeDependency.findMany({
      where: { prerequisiteId: current },
      select: { nodeId: true },
    });

    for (const edge of dependentEdges) {
      if (!visited.has(edge.nodeId)) {
        queue.push(edge.nodeId);
      }
    }
  }

  return false;
}

/**
 * Calculates effective node statuses for all nodes in the Knowledge Tree for a user.
 */
export async function calculateTreeStatuses(userId?: string) {
  const nodes = await prisma.learningNode.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'asc' },
  });

  const edges = await prisma.nodeDependency.findMany({
    select: {
      id: true,
      nodeId: true,
      prerequisiteId: true,
      isMandatory: true,
    },
  });

  if (!userId) {
    // Unauthenticated user: nodes with mandatory prerequisites are LOCKED, others are UNLOCKED
    const prereqMap = new Map<string, boolean>();
    for (const edge of edges) {
      if (edge.isMandatory) {
        prereqMap.set(edge.nodeId, true);
      }
    }

    const nodeResponses: GraphNodeResponse[] = nodes.map((node) => ({
      ...node,
      status: prereqMap.get(node.id) ? NodeStatus.LOCKED : NodeStatus.UNLOCKED,
    }));

    const regions = Array.from(new Set(nodes.map((n) => n.region)));

    return {
      nodes: nodeResponses,
      edges,
      regions,
    };
  }

  // Authenticated user: calculate status based on actual progress, quiz attempts, and user node state
  const userProgressList = await prisma.progress.findMany({
    where: { userId },
    select: { lessonId: true, completed: true },
  });

  const completedLessonIds = new Set(
    userProgressList.filter((p) => p.completed).map((p) => p.lessonId),
  );
  const startedLessonIds = new Set(userProgressList.map((p) => p.lessonId));

  const userNodeStates = await prisma.userNodeState.findMany({
    where: { userId },
  });
  const userNodeStateMap = new Map(userNodeStates.map((s) => [s.nodeId, s]));

  // Build prerequisite mapping (nodeId -> array of mandatory prerequisiteIds)
  const mandatoryPrereqMap = new Map<string, string[]>();
  for (const edge of edges) {
    if (edge.isMandatory) {
      const list = mandatoryPrereqMap.get(edge.nodeId) || [];
      list.push(edge.prerequisiteId);
      mandatoryPrereqMap.set(edge.nodeId, list);
    }
  }

  const computedStatusMap = new Map<string, NodeStatus>();

  const computeStatusForNode = (nodeId: string): NodeStatus => {
    if (computedStatusMap.has(nodeId)) {
      return computedStatusMap.get(nodeId)!;
    }

    const node = nodes.find((n) => n.id === nodeId);
    const userState = userNodeStateMap.get(nodeId);

    // Check mandatory prerequisites
    const mandatoryPrereqIds = mandatoryPrereqMap.get(nodeId) || [];
    let allPrereqsSatisfied = true;

    for (const prereqId of mandatoryPrereqIds) {
      const prereqStatus = computeStatusForNode(prereqId);
      if (prereqStatus !== NodeStatus.COMPLETED && prereqStatus !== NodeStatus.MASTERED) {
        allPrereqsSatisfied = false;
        break;
      }
    }

    if (!allPrereqsSatisfied) {
      computedStatusMap.set(nodeId, NodeStatus.LOCKED);
      return NodeStatus.LOCKED;
    }

    // Prerequisites satisfied: evaluate completion/mastery state
    if (userState?.status === NodeStatus.MASTERED || userState?.masteredAt) {
      computedStatusMap.set(nodeId, NodeStatus.MASTERED);
      return NodeStatus.MASTERED;
    }

    const isLessonCompleted = node?.lessonId ? completedLessonIds.has(node.lessonId) : false;
    const isLessonStarted = node?.lessonId ? startedLessonIds.has(node.lessonId) : false;

    if (userState?.status === NodeStatus.COMPLETED || userState?.completedAt || isLessonCompleted) {
      computedStatusMap.set(nodeId, NodeStatus.COMPLETED);
      return NodeStatus.COMPLETED;
    }

    if (userState?.status === NodeStatus.IN_PROGRESS || isLessonStarted) {
      computedStatusMap.set(nodeId, NodeStatus.IN_PROGRESS);
      return NodeStatus.IN_PROGRESS;
    }

    computedStatusMap.set(nodeId, NodeStatus.UNLOCKED);
    return NodeStatus.UNLOCKED;
  };

  const nodeResponses: GraphNodeResponse[] = nodes.map((node) => ({
    ...node,
    status: computeStatusForNode(node.id),
  }));

  const regions = Array.from(new Set(nodes.map((n) => n.region)));

  return {
    nodes: nodeResponses,
    edges,
    regions,
  };
}

/**
 * Retrieves full tree graph suitable for GTA-style map visualizer.
 */
export async function getNodesTree(userId?: string) {
  return calculateTreeStatuses(userId);
}

/**
 * Retrieves a single learning node by its slug with prerequisites, child dependents, and learner status.
 */
export async function getNodeBySlug(slug: string, userId?: string) {
  const node = await prisma.learningNode.findUnique({
    where: { slug },
    include: {
      course: {
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          difficulty: true,
        },
      },
      lesson: {
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          order: true,
        },
      },
      prerequisiteEdges: {
        include: {
          prerequisite: {
            select: {
              id: true,
              slug: true,
              title: true,
              region: true,
              nodeType: true,
              icon: true,
            },
          },
        },
      },
      dependentEdges: {
        include: {
          node: {
            select: {
              id: true,
              slug: true,
              title: true,
              region: true,
              nodeType: true,
              icon: true,
            },
          },
        },
      },
    },
  });

  if (!node || !node.isPublished) {
    throw new NotFoundError(`Learning node with slug "${slug}" not found`);
  }

  // Calculate tree statuses to obtain learner's exact status for this node
  const treeData = await calculateTreeStatuses(userId);
  const statusObj = treeData.nodes.find((n) => n.id === node.id);

  const status = statusObj ? statusObj.status : NodeStatus.LOCKED;

  // Format prerequisites and dependent child nodes
  const prerequisites = node.prerequisiteEdges.map((edge) => ({
    ...edge.prerequisite,
    isMandatory: edge.isMandatory,
    status: treeData.nodes.find((n) => n.id === edge.prerequisite.id)?.status || NodeStatus.LOCKED,
  }));

  const dependents = node.dependentEdges.map((edge) => ({
    ...edge.node,
    isMandatory: edge.isMandatory,
    status: treeData.nodes.find((n) => n.id === edge.node.id)?.status || NodeStatus.LOCKED,
  }));

  return {
    id: node.id,
    slug: node.slug,
    title: node.title,
    description: node.description,
    region: node.region,
    nodeType: node.nodeType,
    positionX: node.positionX,
    positionY: node.positionY,
    icon: node.icon,
    isPublished: node.isPublished,
    course: node.course,
    lesson: node.lesson,
    status,
    prerequisites,
    dependents,
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
  };
}

/**
 * Creates a new learning node.
 */
export async function createNode(data: CreateNodeInput) {
  const existing = await prisma.learningNode.findUnique({
    where: { slug: data.slug },
  });

  if (existing) {
    throw new ConflictError(`Learning node with slug "${data.slug}" already exists`);
  }

  if (data.courseId) {
    const course = await prisma.course.findUnique({ where: { id: data.courseId } });
    if (!course) {
      throw new NotFoundError(`Course with ID "${data.courseId}" not found`);
    }
  }

  if (data.lessonId) {
    const lesson = await prisma.lesson.findUnique({ where: { id: data.lessonId } });
    if (!lesson) {
      throw new NotFoundError(`Lesson with ID "${data.lessonId}" not found`);
    }
  }

  return prisma.learningNode.create({
    data: {
      slug: data.slug,
      title: data.title,
      description: data.description,
      region: data.region,
      nodeType: data.nodeType,
      positionX: data.positionX ?? 0,
      positionY: data.positionY ?? 0,
      icon: data.icon,
      courseId: data.courseId,
      lessonId: data.lessonId,
      isPublished: data.isPublished ?? true,
    },
  });
}

/**
 * Updates an existing learning node by ID.
 */
export async function updateNode(id: string, data: UpdateNodeInput) {
  const node = await prisma.learningNode.findUnique({ where: { id } });

  if (!node) {
    throw new NotFoundError(`Learning node with ID "${id}" not found`);
  }

  if (data.slug && data.slug !== node.slug) {
    const existingSlug = await prisma.learningNode.findUnique({ where: { slug: data.slug } });
    if (existingSlug) {
      throw new ConflictError(`Learning node with slug "${data.slug}" already exists`);
    }
  }

  if (data.courseId) {
    const course = await prisma.course.findUnique({ where: { id: data.courseId } });
    if (!course) {
      throw new NotFoundError(`Course with ID "${data.courseId}" not found`);
    }
  }

  if (data.lessonId) {
    const lesson = await prisma.lesson.findUnique({ where: { id: data.lessonId } });
    if (!lesson) {
      throw new NotFoundError(`Lesson with ID "${data.lessonId}" not found`);
    }
  }

  return prisma.learningNode.update({
    where: { id },
    data,
  });
}

/**
 * Adds a prerequisite link between a prerequisite node and a target node.
 * Performs checks against self-dependencies, duplicate edges, and cyclic dependencies.
 */
export async function addPrerequisite(nodeId: string, data: AddPrerequisiteInput) {
  const { prerequisiteId, isMandatory } = data;

  if (nodeId === prerequisiteId) {
    throw new BadRequestError('A learning node cannot depend on itself.');
  }

  const targetNode = await prisma.learningNode.findUnique({ where: { id: nodeId } });
  if (!targetNode) {
    throw new NotFoundError(`Target learning node with ID "${nodeId}" not found`);
  }

  const prereqNode = await prisma.learningNode.findUnique({ where: { id: prerequisiteId } });
  if (!prereqNode) {
    throw new NotFoundError(`Prerequisite learning node with ID "${prerequisiteId}" not found`);
  }

  const existingEdge = await prisma.nodeDependency.findUnique({
    where: {
      nodeId_prerequisiteId: {
        nodeId,
        prerequisiteId,
      },
    },
  });

  if (existingEdge) {
    throw new ConflictError('Prerequisite dependency edge already exists between these nodes.');
  }

  // Cycle detection: check if adding prerequisiteId -> nodeId creates a cycle
  const createsCycle = await hasPath(nodeId, prerequisiteId);
  if (createsCycle) {
    throw new ConflictError(
      'Cannot add prerequisite link because it would create a cyclic dependency in the learning tree graph.',
    );
  }

  return prisma.nodeDependency.create({
    data: {
      nodeId,
      prerequisiteId,
      isMandatory: isMandatory ?? true,
    },
    include: {
      node: { select: { id: true, slug: true, title: true } },
      prerequisite: { select: { id: true, slug: true, title: true } },
    },
  });
}

/**
 * Removes a prerequisite link between target node and prerequisite node.
 */
export async function removePrerequisite(nodeId: string, prerequisiteId: string) {
  const existingEdge = await prisma.nodeDependency.findUnique({
    where: {
      nodeId_prerequisiteId: {
        nodeId,
        prerequisiteId,
      },
    },
  });

  if (!existingEdge) {
    throw new NotFoundError('Prerequisite dependency edge not found.');
  }

  return prisma.nodeDependency.delete({
    where: {
      nodeId_prerequisiteId: {
        nodeId,
        prerequisiteId,
      },
    },
  });
}
