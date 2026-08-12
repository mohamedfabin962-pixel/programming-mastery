-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('CONCEPT', 'LESSON', 'CHALLENGE', 'PROJECT');

-- CreateEnum
CREATE TYPE "NodeStatus" AS ENUM ('LOCKED', 'UNLOCKED', 'IN_PROGRESS', 'COMPLETED', 'MASTERED');

-- CreateTable
CREATE TABLE "learning_node" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "nodeType" "NodeType" NOT NULL DEFAULT 'CONCEPT',
    "positionX" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "positionY" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "icon" TEXT,
    "courseId" TEXT,
    "lessonId" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "learning_node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "node_dependency" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "prerequisiteId" TEXT NOT NULL,
    "isMandatory" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "node_dependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_node_state" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "status" "NodeStatus" NOT NULL DEFAULT 'LOCKED',
    "completedAt" TIMESTAMP(3),
    "masteredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_node_state_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "learning_node_slug_key" ON "learning_node"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "node_dependency_nodeId_prerequisiteId_key" ON "node_dependency"("nodeId", "prerequisiteId");

-- CreateIndex
CREATE UNIQUE INDEX "user_node_state_userId_nodeId_key" ON "user_node_state"("userId", "nodeId");

-- AddForeignKey
ALTER TABLE "learning_node" ADD CONSTRAINT "learning_node_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "learning_node" ADD CONSTRAINT "learning_node_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "node_dependency" ADD CONSTRAINT "node_dependency_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "learning_node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "node_dependency" ADD CONSTRAINT "node_dependency_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "learning_node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_node_state" ADD CONSTRAINT "user_node_state_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_node_state" ADD CONSTRAINT "user_node_state_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "learning_node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
