import { Rent } from '../models/Rent.js';

// User - Rent a book
export const createRent = async (req, res) => {
  const rent = await Rent.create({
    book: req.body.book,
    user: req.user.id,
    rentDate: new Date()
  });
  res.status(201).json(rent);
};









//  User - View own rents
export const getMyRents = async (req, res) => {
  const rents = await Rent.find({ user: req.user.id }).populate('book');
  res.json(rents);
};

//  Admin - View all rents
export const getAllRents = async (req, res) => {
  const rents = await Rent.find().populate('book user');
  res.json(rents);
};

//  Admin - View single rent
export const getRent = async (req, res) => {
  const rent = await Rent.findById(req.params.id).populate('book user');
  if (!rent) return res.status(404).json({ message: "Rent not found" });
  res.json(rent);
};

//  Admin - Update rent (e.g., mark returned)
export const updateRent = async (req, res) => {
  const rent = await Rent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!rent) return res.status(404).json({ message: "Rent not found" });
  res.json(rent);
};

//  Admin - Delete rent
export const deleteRent = async (req, res) => {
  const rent = await Rent.findByIdAndDelete(req.params.id);
  if (!rent) return res.status(404).json({ message: "Rent not found" });
  res.json({ message: "Rent deleted" });
};




// rentController.js

export const updateRentStatus = async (req, res) => {
  const rent = await Rent.findById(req.params.id);

  if (!rent) {
    return res.status(404).json({ message: 'Rent not found' });
  }

  const today = new Date();

  // Mark overdue if returnDate is past and status still active
  if (rent.status === 'active' && rent.returnDate && rent.returnDate < today) {
    rent.status = 'overdue';
  }

  // Example: if book is returned (by admin/user)
  if (req.body.status === 'completed') {
    rent.status = 'completed';
    rent.returnDate = new Date();
  }

  // Allow admin to cancel
  if (req.body.status === 'cancelled') {
    rent.status = 'cancelled';
  }

  await rent.save();
  res.json(rent);
};






