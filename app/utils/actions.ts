"use server"
import { dbConnect } from "./dbConnect"
import * as bcrypt from "bcryptjs"
import UserModel from "@/models/user"
import { cookies } from "next/headers"
import { encrypt,decrypt } from "./session"
import { redirect } from "next/navigation"
import RoomModel from "@/models/room"
import { MongooseError } from "mongoose"
import { revalidatePath } from "next/cache"
import { MongoServerError } from "mongodb";

export const signUp = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.password, salt);
    userData.password = hash;

    await dbConnect();
    const existUser = await UserModel.findOne({ email: userData.email });
    if (existUser) {
      return {
        message: "user already exist",
        success: false,
      };
    }

    const result = await UserModel.create(userData);

    if (!result) {
      return {
        success: false,
        message: "Something went Wrong",
      };
    }

    return {
      success: true,
      message: "User registered Succesfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

export const signIn=async(LogData:{email:string, password:string})=>{
  try {
    await dbConnect();
    const user = await UserModel.findOne({ email: LogData.email }).select(
      "+password",
    );

    if (!user) {
      return {
        success: false,
        message: "invalid credentials",
      };
    }
    const isUser = await bcrypt.compare(LogData.password, user.password);

    if (!isUser) {
      return {
        success: false,
        message: "invalid credentials",
      };
    }

    const cookieStore = await cookies();
    const token = await encrypt({ _id: user._id.toString() });
    cookieStore.set("token", token);
    return {
      success: true,
      message: "user successfully logged in",
    };
  } catch (error) {
    return {
      success: false,
      message: " something went wrong",
    };
  }
}

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { success: true,message:"logout Successful" };
  } catch (error) {
    return { success: true, message: "Something went wrong" };
  }
};

interface form{
name: string;
roomNumber:string;
description: string;
price: string;
capacity: string;
category:string;
size: string;
image: string;
amenities:string[];
}

export const addRoom = async (form:form) => {
  try {
    await dbConnect();
    const isExisting = await RoomModel.findOne({ name: form.name,roomNumber:form.roomNumber});

    if (isExisting) {
      return {
        status: false,
        message: "A room with this name and number already exist",
      };
    }

    const post = await RoomModel.create(form);
    revalidatePath("/admindashboard");
    return {
      status: true,
      message: "Room added successfully",
      room: post,
    };
  } catch (error) {

    if (error instanceof MongoServerError && error.code === 11000) {
      return {
        status: false,
        message: "Room with this name and number already exists",
      };
    }
    return {
      status: false,
      message:"something went wrong",
      
    };
  }
};



const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAIL,
    pass: process.env.NODE_MAIL_PASS,
  },
});

export const sendMail = async (details: {
  fullName: string;
  eMail: string;
}) => {
  const { fullName, eMail } = details;
  const Mail = {
    from: process.env.NODE_MAIL,
    to: eMail,
    subject: "Royal Crest Hotels",
    html: ` <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Royal Crest</title>
      <style>
        body { margin: 0; padding: 0; background-color: #FDFBF7; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #FDFBF7; padding-bottom: 40px; }
        .main { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; color: #1e293b; }
        .header { background-color: #0f172a; padding: 40px; text-align: center; }
        .logo { color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 4px; text-decoration: none; }
        .content { padding: 40px 30px; line-height: 1.6; }
        .greeting { font-size: 28px; color: #0f172a; margin-bottom: 20px; font-weight: 700; }
        .membership-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 25px; margin: 30px 0; }
        .button { background-color: #f59e0b; color: #ffffff !important; padding: 15px 30px; border-radius: 50px; text-decoration: none; display: inline-block; font-weight: bold; margin-top: 20px; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #94a3b8; }
        .suite-preview { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .suite-card { padding: 10px; width: 50%; }
        .suite-img { width: 100%; border-radius: 12px; height: 120px; object-fit: cover; }
      </style>
    </head>
    <body>
      <center class="wrapper">
        <table class="main">
          <tr>
            <td class="header">
              <div class="logo">Royal Crest<span style="color: #f59e0b;">.</span></div>
            </td>
          </tr>
          <tr>
            <td class="content">
              <div class="greeting">Hello ${fullName},</div>
              <p>Welcome to <strong>Royal Crest Hotels</strong>.</p>
              <p>You didn’t just sign up for an account; you’ve unlocked the gates to a sanctuary designed for the discerning traveler. At Royal Crest, we believe that luxury is about the moments of stillness and the seamless service that follows you from check-in to checkout.</p>
              
              <div class="membership-card">
                <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #f59e0b; font-weight: bold;">Current Status</p>
                <p style="margin: 5px 0; font-size: 20px; font-weight: bold; color: #0f172a;">Member</p>
                <p style="margin: 0; font-size: 13px; color: #64748b;">₦5,000 Bonus Balance</p>
              </div>

              <h3 style="font-size: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">Where Will You Go First?</h3>
              <table class="suite-preview">
                <tr>
                  <td class="suite-card">
                    <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=400" class="suite-img">
                    <p style="font-size: 14px; font-weight: bold; margin: 10px 0 5px;">Royal Ocean Suite</p>
                    <a href="#" style="color: #f59e0b; font-size: 12px; text-decoration: none; font-weight: bold;">Explore →</a>
                  </td>
                  <td class="suite-card">
                    <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=400" class="suite-img">
                    <p style="font-size: 14px; font-weight: bold; margin: 10px 0 5px;">Zen Garden Studio</p>
                    <a href="#" style="color: #f59e0b; font-size: 12px; text-decoration: none; font-weight: bold;">Explore →</a>
                  </td>
                </tr>
              </table>

              <center>
                <a href="https://Royal Crest-hotels.com/dashboard" class="button">Visit Member Dashboard</a>
              </center>
            </td>
          </tr>
          <tr>
            <td class="footer">
              <p>You received this email because you signed up for a Royal Crest account.</p>
              <p>© 2026 Royal Crest Hotels & Resorts. All rights reserved.</p>
              <p><a href="#" style="color: #94a3b8;">Unsubscribe</a> | <a href="#" style="color: #94a3b8;">Privacy Policy</a></p>
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>`,
  };

  await transporter.sendMail(Mail, function (err: string) {
    if (err) {
      console.log(err);
    }
  });
};
