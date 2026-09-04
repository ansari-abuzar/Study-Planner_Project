import {
  getProfile as getProfileService,
  updateProfile as updateProfileService,
  deleteProfile as deleteProfileService,
} from "../../../backend/src/services/userServices.js";

const getProfile = async (req, res) => {
  const user = await getProfileService(req.userId);

  res.json({ user });
};

const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await updateProfileService(req.userId, name, email);

  res.json({ user });
};

const deleteProfile = async (req, res) => {
  await deleteProfileService(req.userId);

  res.json({ message: "User deleted successfully." });
};

export { getProfile, updateProfile, deleteProfile };
