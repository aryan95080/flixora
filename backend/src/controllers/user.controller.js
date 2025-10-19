import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: "User registered successfully" });
  const {fullName, username, email, password } = req.body;
  //console.log(username, email, password);

  // Validate input fields

  // step 1: check if any field is missing
  // step 2: check if username or email already exists
  // step 3: upload avatar and cover image to cloudinary
  // step 4:remove password and refresh token from the user object before sending response
  // step 5: create user in the database
  // step 6: return success response with created user data (excluding password and refresh token)

  
  if(
    [fullName, username, email, password].some((field) => field?.trim()==="")
  ){
    throw new ApiError(400,"All fields are required");
  }

  const userExists = await User.findOne({$or:[{username},{email}]});
  if(userExists){
    throw new ApiError(409,"Username or email already exists");
  }

  const avatarLocalPath=req.files?.avatar[0]?.path;
  const coverImageLocalPath=req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400,"Avatar image is required");
  }
  
  const avatar=await uploadOnCloudinary(avatarLocalPath);
  const coverImage=await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(500,"Failed to upload avatar image");
  }

  const user=await User.create({
    fullname:fullName,
    username:username.toLowerCase(), 
    email,  
    password,
    avatar:avatar.secure_url,
    coverImage:coverImage?.secure_url||"",
  })

  const createdUser=await User.findById(user._id).select("-password -refreshToken");

  if(!createdUser){
    throw new ApiError(500,"User registration failed");
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  )

});

export { registerUser };
