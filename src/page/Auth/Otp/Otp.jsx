import otpImage from "../../../assets/auth/otp.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import OTPInput from "react-otp-input";
import { useState } from "react";
import CustomButton from "../../../utils/CustomButton";
import {
  useVerifyEmailMutation,
} from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();
  const verifyToken = useSelector((state) => state?.auth?.verifyToken);
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };
  const handleMatchOtp = async () => {
    try {
      const res = await verifyOtp({
        email,
        token: verifyToken,
        otp,
      });
      if (res.error) {
        toast.error(res?.error?.data?.message);
      }
      if (res.data) {
        toast.success(res?.data?.message);
        navigate(`/auth/new-password/${email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full max-w-6xl mx-auto h-full md:h-screen grid grid-cols-1 md:grid-cols-2 place-content-center px-5 py-10 gap-8">
      <div>
        <img src={otpImage} className="w-full h-full mx-auto" alt="" />
      </div>
      <div className="mt-16">
        <div className="mb-5 space-y-5">
          <h1 className="font-semibold text-xl flex items-center gap-2">
            <Link to="/auth/forget-password">
              <IoIosArrowBack />
            </Link>
            Verify OTP
          </h1>
          <h1>{`We'll send a verification code to your email. Check your inbox and enter the code here.`}</h1>
        </div>
        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          renderInput={(props) => <input {...props} />}
          containerStyle="otp-container"
          inputStyle={{
            width: "100%",
            maxWidth: "6.5rem",
            height: "3rem",
            margin: "0 0.5rem",
            fontSize: "2rem",
            fontWeight: "bold",
            borderBottom: "1px solid #4E4E4E",
            textAlign: "center",
            outline: "none",
          }}
        />
        <div onClick={handleMatchOtp} className="mt-5">
          <CustomButton loading={isLoading} border className="w-full">
            Verify
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Otp;
