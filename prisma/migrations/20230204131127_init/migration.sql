-- CreateTable
CREATE TABLE "People" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "eyeColor" TEXT,
    "gender" TEXT,
    "hairColor" TEXT,
    "homeWorldId" INTEGER,
    CONSTRAINT "People_homeWorldId_fkey" FOREIGN KEY ("homeWorldId") REFERENCES "Planet" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Planet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "population" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Species" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalId" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PeopleToSpecies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PeopleToSpecies_A_fkey" FOREIGN KEY ("A") REFERENCES "People" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PeopleToSpecies_B_fkey" FOREIGN KEY ("B") REFERENCES "Species" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "People_originalId_key" ON "People"("originalId");

-- CreateIndex
CREATE UNIQUE INDEX "Planet_originalId_key" ON "Planet"("originalId");

-- CreateIndex
CREATE UNIQUE INDEX "Species_originalId_key" ON "Species"("originalId");

-- CreateIndex
CREATE UNIQUE INDEX "_PeopleToSpecies_AB_unique" ON "_PeopleToSpecies"("A", "B");

-- CreateIndex
CREATE INDEX "_PeopleToSpecies_B_index" ON "_PeopleToSpecies"("B");
