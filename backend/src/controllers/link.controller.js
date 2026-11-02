import { prisma } from "../lib/prisma.js";

// Create a new link
export async function createLink(req, res) {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({
        message: "Title and URL are required.",
      });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.userId },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    const link = await prisma.link.create({
      data: {
        title,
        url,
        profileId: profile.id,
      },
    });

    return res.status(201).json({
      message: "Link created successfully!",
      link,
    });
  } catch (error) {
    console.error("Create link error:", error);

    return res.status(500).json({
      message: "Something went wrong while creating your link.",
    });
  }
}

// Get all my links
export async function getMyLinks(req, res) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.userId },
      include: {
        links: {
          orderBy: { position: "asc" },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    return res.status(200).json({
      message: "Links retrieved successfully!",
      links: profile.links,
    });
  } catch (error) {
    console.error("Get links error:", error);

    return res.status(500).json({
      message: "Something went wrong while retrieving your links.",
    });
  }
}

// Delete one of my links
export async function deleteLink(req, res) {
  try {
    const linkId = Number(req.params.id);

    if (!Number.isInteger(linkId) || linkId <= 0) {
      return res.status(400).json({
        message: "Invalid link ID.",
      });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.userId },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    const link = await prisma.link.findFirst({
      where: {
        id: linkId,
        profileId: profile.id,
      },
    });

    if (!link) {
      return res.status(404).json({
        message: "Link not found.",
      });
    }

    await prisma.link.delete({
      where: { id: linkId },
    });

    return res.status(200).json({
      message: "Link deleted successfully!",
    });
  } catch (error) {
    console.error("Delete link error:", error);

    return res.status(500).json({
      message: "Something went wrong while deleting your link.",
    });
  }
}

// Update one of my links
export async function updateLink(req, res) {
  try {
    const linkId = Number(req.params.id);
    const { title, url, isActive } = req.body;

    if (!Number.isInteger(linkId) || linkId <= 0) {
      return res.status(400).json({
        message: "Invalid link ID.",
      });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.userId },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    const link = await prisma.link.findFirst({
      where: {
        id: linkId,
        profileId: profile.id,
      },
    });

    if (!link) {
      return res.status(404).json({
        message: "Link not found.",
      });
    }

    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: {
        title,
        url,
        isActive,
      },
    });

    return res.status(200).json({
      message: "Link updated successfully!",
      link: updatedLink,
    });
  } catch (error) {
    console.error("Update link error:", error);

    return res.status(500).json({
      message: "Something went wrong while updating your link.",
    });
  }
}