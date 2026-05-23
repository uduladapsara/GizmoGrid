const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  const email = "admin@gmail.com";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists.");
    process.exit(0);
  }

  await User.create({
    name: "Admin",
    email,
    password: "admin123",
    role: "admin",
    sellerApproved: true,
    userApproved: true,
  });

  console.log("Admin user created: admin@gmail.com / admin123");
  process.exit(0);
};

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});
