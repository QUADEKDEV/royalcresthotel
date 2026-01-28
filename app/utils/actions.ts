"use server"
import { refresh, revalidatePath } from "next/cache"
import { dbConnect } from "./dbConnect"
import { MongooseError } from "mongoose"
import * as bcrypt from "bcryptjs"
// import * as bcrypt from "bcrypt"
import UserModel from "@/models/user"
import { cookies } from "next/headers"
import { encrypt,decrypt } from "./session"
import { redirect } from "next/dist/server/api-utils"

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
        message: "user exist",
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

// export const logout =async ()=>{
//     try {
//         const cookieStore = await cookies();
//         cookieStore.delete("token");
//         // return { success: true };
//     } catch (error) {
//         redirect("/signin")
//         // return { success: false };
//     }
   
// }
// export const singIn = async(LogData:{email:string, password:string})=>{
//    try {
//        await dbConnect()
//        const user = await UserModel.findOne({ email: LogData.email }).select('+password')
//         console.log(user);
        
//        if (!user) {
//            return {
//                success: false,
//                message: 'invalid credentials'
//            }
//        }
//        const isUser = await bcrypt.compare(LogData.password, user.password)

//        if (!isUser) {
//            return {
//                success: false,
//                message: 'invalid credentials'
//            }
//        }

//        const cookieStore = await cookies();
//        const token = await encrypt({ _id: user._id.toString() });
//        cookieStore.set('token', token)
//        console.log(token)
//        return {
//            success: true,
//            message: 'user successfully logged in'
//        }
//    } catch (error) {
//     return{
//         success: false,
//         message: ' something went wrong'
//     }
//    }
// }


//  export const getUser = async () => {

//      await dbConnect();
//      const cookieStore = await cookies();
//      const token = cookieStore.get("token")?.value;

//      if (!token) {
//        return { success: false, message: "No token found" };
//      }

//      // decrypt token
//      const decoded = await decrypt(token);
//          const userId = decoded?.payload?._id;

//      // FETCH USER USING THE STRING ID
//      const user = await UserModel.findById(userId)
//     //  .lean();
//     return { success:true, message: "User found" };

//      if (!user) {
//        return { success: false, message: "User not found" };
//      }






// //    await dbConnect();
// //    const cookieStore = await cookies();
// //    const token = cookieStore.get("token")?.value;

// //    if (!token) {
// //     alert("No Token")
// //    }
// //    else{
// //      const decoded = await decrypt(token);
// //       if (!decoded || !decoded.payload) {
// //         alert("Invalid Token")
// //       }
// //       else{
// //          const user = await UserModel.findById(
// //            decoded.payload).lean();
// //            return{user}

// //       }
// //    }

// //    return NextResponse.json({ success: true, user });
//  };