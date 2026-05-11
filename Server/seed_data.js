import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.models.js";
import { Job } from "./models/job.models.js";
import connectDB from "./utils/db.js";

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log("Clearing existing data...");
        // await User.deleteMany({});
        // await Company.deleteMany({});
        // await Job.deleteMany({});
        
        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash("password123", 10);

        console.log("Creating users...");
        const recruiter1 = await User.create({
            fullname: "John Recruiter",
            email: "john@techcorp.com",
            phoneNumber: 9876543210,
            password: hashedPassword,
            role: "recruiter",
            profile: { bio: "Head of Talent at TechCorp", skills: [] }
        });

        const recruiter2 = await User.create({
            fullname: "Sarah Hirer",
            email: "sarah@startup.io",
            phoneNumber: 9876543211,
            password: hashedPassword,
            role: "recruiter",
            profile: { bio: "Recruiter for Web3 Startups", skills: [] }
        });

        const student1 = await User.create({
            fullname: "Alice Developer",
            email: "alice@example.com",
            phoneNumber: 9876543212,
            password: hashedPassword,
            role: "student",
            profile: { bio: "Passionate full-stack developer", skills: ["React", "Node.js", "MongoDB"] }
        });

        console.log("Creating companies...");
        const company1 = await Company.create({
            companyName: "TechCorp",
            description: "A leading technology enterprise.",
            website: "https://techcorp.com",
            location: "San Francisco, CA",
            userId: recruiter1._id
        });

        const company2 = await Company.create({
            companyName: "Startup.io",
            description: "Innovative web3 solutions.",
            website: "https://startup.io",
            location: "Remote",
            userId: recruiter2._id
        });

        console.log("Creating jobs...");
        const jobs = [
            {
                title: "Frontend Developer",
                description: "Looking for an experienced React developer to build modern user interfaces.",
                requirements: ["React", "JavaScript", "Tailwind CSS"],
                salary: 120000,
                experienceLevel: 3,
                location: "San Francisco, CA",
                jobType: "Full-time",
                position: 5,
                company: company1._id,
                created_by: recruiter1._id
            },
            {
                title: "Backend Node.js Engineer",
                description: "Join our core team to scale our backend systems using Node.js and MongoDB.",
                requirements: ["Node.js", "Express", "MongoDB", "REST APIs"],
                salary: 130000,
                experienceLevel: 4,
                location: "San Francisco, CA",
                jobType: "Full-time",
                position: 2,
                company: company1._id,
                created_by: recruiter1._id
            },
            {
                title: "Full Stack Web3 Developer",
                description: "Build decentralized applications with modern full stack web technologies.",
                requirements: ["React", "Node.js", "Solidity", "Web3.js"],
                salary: 150000,
                experienceLevel: 2,
                location: "Remote",
                jobType: "Full-time",
                position: 1,
                company: company2._id,
                created_by: recruiter2._id
            },
            {
                title: "UI/UX Designer",
                description: "Design beautiful and intuitive user experiences for our next generation products.",
                requirements: ["Figma", "UI Design", "UX Research", "Prototyping"],
                salary: 95000,
                experienceLevel: 2,
                location: "Remote",
                jobType: "Contract",
                position: 1,
                company: company2._id,
                created_by: recruiter2._id
            },
            {
                title: "Software Engineering Intern",
                description: "Entry level software engineering position for recent graduates or final year students.",
                requirements: ["JavaScript", "HTML/CSS", "Git", "Problem Solving"],
                salary: 60000,
                experienceLevel: 0,
                location: "San Francisco, CA",
                jobType: "Internship",
                position: 10,
                company: company1._id,
                created_by: recruiter1._id
            }
        ];

        await Job.insertMany(jobs);

        console.log("Database seeded successfully!");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedDatabase();
