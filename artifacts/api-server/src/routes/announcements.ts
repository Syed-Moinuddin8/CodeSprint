import { Router } from "express";
import { db } from "@workspace/db";
import { announcementsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { CreateAnnouncementBody, UpdateAnnouncementBody, UpdateAnnouncementParams, DeleteAnnouncementParams } from "@workspace/api-zod";

const router = Router();

router.get("/announcements", async (req, res): Promise<void> => {
  try {
    const announcements = await db
      .select()
      .from(announcementsTable)
      .orderBy(announcementsTable.createdAt);
    res.json(announcements.map((a) => ({ ...a, createdAt: String(a.createdAt) })));
  } catch (err) {
    console.error("Failed to list announcements", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/announcements", async (req, res): Promise<void> => {
  if (!(req as any).session?.adminAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const parsed = CreateAnnouncementBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  try {
    const [announcement] = await db
      .insert(announcementsTable)
      .values(parsed.data)
      .returning();
    res.status(201).json({ ...announcement, createdAt: String(announcement!.createdAt) });
  } catch (err) {
    console.error("Failed to create announcement", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/announcements/:id", async (req, res): Promise<void> => {
  if (!(req as any).session?.adminAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const params = UpdateAnnouncementParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const parsed = UpdateAnnouncementBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  try {
    const [updated] = await db
      .update(announcementsTable)
      .set(parsed.data)
      .where(eq(announcementsTable.id, params.data.id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ ...updated, createdAt: String(updated.createdAt) });
  } catch (err) {
    console.error("Failed to update announcement", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/announcements/:id", async (req, res): Promise<void> => {
  if (!(req as any).session?.adminAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const params = DeleteAnnouncementParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  try {
    const [deleted] = await db
      .delete(announcementsTable)
      .where(eq(announcementsTable.id, params.data.id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    console.error("Failed to delete announcement", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
