
import { prisma } from "../lib/prisma.js";

// Create a new profile
export async function createProfile(req, res) {
  try {
    const { username, displayName, bio, avatarUrl } = req.body;

    if (!username || !displayName) {
      return res.status(400).json({
        message: "Username and display name are required.",
      });
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: req.user.userId },
    });

    if (existingProfile) {
      return res.status(409).json({
        message: "You already have a profile.",
      });
    }

    const usernameTaken = await prisma.profile.findUnique({
      where: { username },
    });

    if (usernameTaken) {
      return res.status(409).json({
        message: "This username is already taken.",
      });
    }

    const profile = await prisma.profile.create({
      data: {
        username,
        displayName,
        bio,
        avatarUrl,
        userId: req.user.userId,
      },
    });

    return res.status(201).json({
      message: "Profile created successfully!",
      profile,
    });
  } catch (error) {
    console.error("Create profile error:", error);

    return res.status(500).json({
      message: "Something went wrong while creating your profile.",
    });
  }
}

// Get the logged-in user's profile
export async function getMyProfile(req, res) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.userId },
      include: { links: true },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    return res.status(200).json({
      message: "Profile retrieved successfully!",
      profile,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Something went wrong while retrieving your profile.",
    });
  }
}

// Update the logged-in user's profile
export async function updateMyProfile(req, res) {
  try {
    const { displayName, bio, avatarUrl } = req.body;

    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.userId },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId: req.user.userId },
      data: { displayName, bio, avatarUrl },
    });

    return res.status(200).json({
      message: "Profile updated successfully!",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      message: "Something went wrong while updating your profile.",
    });
  }
}

// Get a public profile using the username
export async function getPublicProfile(req, res) {
  try {
    const { username } = req.params;

    const profile = await prisma.profile.findUnique({
      where: { username },
      select: {
        username: true,
        displayName: true,
        bio: true,
        avatarUrl: true,
        links: {
          where: { isActive: true },
          orderBy: { position: "asc" },
          select: {
            id: true,
            title: true,
            url: true,
          },
        },
      },
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found.",
      });
    }

    return res.status(200).json({
      message: "Public profile retrieved successfully.",
      profile,
    });
  } catch (error) {
    console.error("Get public profile error:", error);

    return res.status(500).json({
      message: "Something went wrong while retrieving the profile.",
    });
  }
}
