import MedicalTravelHelp from "../models/MedicalTravelHelp.js";

// @desc    Create new medical travel help request
// @route   POST /api/travel-help
// @access  Public (or Authenticated User)
export const createTravelHelp = async (req, res) => {
  try {
    const request = new MedicalTravelHelp(req.body);
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all medical travel help requests (Admin)
// @route   GET /api/travel-help
// @access  Admin
export const getAllTravelHelps = async (req, res) => {
  try {
    const helps = await MedicalTravelHelp.find().populate("userId", "name email");
    res.status(200).json(helps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single travel help request
// @route   GET /api/travel-help/:id
// @access  Admin/User
export const getTravelHelpById = async (req, res) => {
  try {
    const help = await MedicalTravelHelp.findById(req.params.id).populate("userId", "name email");
    if (!help) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(help);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update a travel help request (admin adds notes/status)
// @route   PATCH /api/travel-help/:id
// @access  Admin
export const updateTravelHelp = async (req, res) => {
  try {
    const updated = await MedicalTravelHelp.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Request not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete a travel help request
// @route   DELETE /api/travel-help/:id
// @access  Admin
export const deleteTravelHelp = async (req, res) => {
  try {
    const deleted = await MedicalTravelHelp.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Request not found" });
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Search travel help requests (optional filter)
// @route   GET /api/travel-help/search?q=condition
// @access  Admin
export const searchTravelHelps = async (req, res) => {
  try {
    const { q } = req.query;
    const helps = await MedicalTravelHelp.find({
      $or: [
        { patientName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { medicalCondition: { $regex: q, $options: "i" } },
      ],
    });
    res.status(200).json(helps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
