import { z } from 'zod';
import { NodeType } from '@prisma/client';

export const getNodeBySlugParamsSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(1, 'Slug is required')
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  })
  .strict();

export type GetNodeBySlugParams = z.infer<typeof getNodeBySlugParamsSchema>;

export const getNodeByIdParamsSchema = z
  .object({
    id: z.string().uuid('Invalid node ID format. Expected a valid UUID.'),
  })
  .strict();

export type GetNodeByIdParams = z.infer<typeof getNodeByIdParamsSchema>;

export const createNodeSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, 'Slug is required')
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must contain only lowercase letters, numbers, and hyphens',
      ),
    title: z.string().trim().min(2, 'Title must be at least 2 characters'),
    description: z.string().trim().min(1, 'Description is required'),
    region: z.string().trim().min(2, 'Region is required'),
    nodeType: z
      .nativeEnum(NodeType, {
        message: 'nodeType must be CONCEPT, LESSON, CHALLENGE, or PROJECT',
      })
      .optional(),
    positionX: z.number().optional(),
    positionY: z.number().optional(),
    icon: z.string().trim().optional().nullable(),
    courseId: z.string().uuid('Invalid course ID format').optional().nullable(),
    lessonId: z.string().uuid('Invalid lesson ID format').optional().nullable(),
    isPublished: z.boolean().optional(),
  })
  .strict();

export type CreateNodeInput = z.infer<typeof createNodeSchema>;

export const updateNodeSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, 'Slug is required')
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug must contain only lowercase letters, numbers, and hyphens',
      )
      .optional(),
    title: z.string().trim().min(2, 'Title must be at least 2 characters').optional(),
    description: z.string().trim().min(1, 'Description is required').optional(),
    region: z.string().trim().min(2, 'Region is required').optional(),
    nodeType: z.nativeEnum(NodeType).optional(),
    positionX: z.number().optional(),
    positionY: z.number().optional(),
    icon: z.string().trim().optional().nullable(),
    courseId: z.string().uuid('Invalid course ID format').optional().nullable(),
    lessonId: z.string().uuid('Invalid lesson ID format').optional().nullable(),
    isPublished: z.boolean().optional(),
  })
  .strict();

export type UpdateNodeInput = z.infer<typeof updateNodeSchema>;

export const addPrerequisiteSchema = z
  .object({
    prerequisiteId: z.string().uuid('Prerequisite ID must be a valid UUID.'),
    isMandatory: z.boolean().optional(),
  })
  .strict();

export type AddPrerequisiteInput = z.infer<typeof addPrerequisiteSchema>;

export const removePrerequisiteParamsSchema = z
  .object({
    id: z.string().uuid('Invalid node ID format. Expected a valid UUID.'),
    prerequisiteId: z.string().uuid('Invalid prerequisite ID format. Expected a valid UUID.'),
  })
  .strict();

export type RemovePrerequisiteParams = z.infer<typeof removePrerequisiteParamsSchema>;
