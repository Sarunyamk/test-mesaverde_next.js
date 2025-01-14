'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { IoIosSave } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";

import { FormDataType } from './types/formDataType';
import { ErrorType } from './types/errorType';
import { Page1 } from './components/forms/Page1';
import { Page2 } from './components/forms/Page2';
import { Page3 } from './components/forms/Page3';
import { ReviewForm } from './components/forms/ReviewForm';
import { Button } from './components/Button';
import { validateFile } from '@/ีutils/validateFile';

export default function HomePage() {

  const [step, setStep] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [formData, setFormData] = useState<FormDataType>({
    prefix: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    age: 0,
    address: "",
    education: "",
    experience: "",
    resumeUrl: null,
  })


  const hdlNextStep = () => {

    const currentErrors: ErrorType[] = [];

    if (step === 1) {

      if (!formData.prefix || !["Mr", "Ms", "Mrs", "Other"].includes(formData.prefix)) {
        currentErrors.push({ field: "prefix", message: "Prefix is required and must be valid." });
      }
      if (!formData.firstName || !/^[a-zA-Zก-๙\s]+$/.test(formData.firstName)) {
        currentErrors.push({
          field: "firstName",
          message: "First Name only contain characters (English or Thai), and no special symbols.",
        });
      }
      if (!formData.lastName || !/^[a-zA-Zก-๙\s]+$/.test(formData.lastName)) {
        currentErrors.push({
          field: "lastName",
          message: "Last Name must only contain characters (English or Thai), and no special symbols"
        });
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        currentErrors.push({ field: "email", message: "Valid Email is required." });
      }
      if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
        currentErrors.push({
          field: "phoneNumber",
          message: "Phone Number must be exactly 10 digits.",
        });
      }
    }

    if (step === 2) {

      if (!formData.gender || !["Male", "Female", "Other"].includes(formData.gender)) {
        currentErrors.push({ field: "gender", message: "Gender is required and must be valid." });
      }
      if (!formData.age || formData.age <= 0) {
        currentErrors.push({
          field: "age",
          message: "Age must be greater than 0.",
        });
      }
      if (!formData.address || formData.address.trim() === "") {
        currentErrors.push({ field: "address", message: "Address is required." });
      }
    }

    if (step === 3) {

      if (!formData.education || !["HighSchool", "Diploma", "Bachelor", "Master", "Doctorate", "Other"].includes(formData.education)) {
        currentErrors.push({ field: "education", message: "Education is required and must be valid." });
      }
      if (!formData.experience || formData.experience.trim() === "") {
        currentErrors.push({
          field: "experience",
          message: "Work Experience is required.",
        });
      }

      if (formData.resumeUrl) {
        if (formData.resumeUrl instanceof File) {
          const fileError = validateFile(formData.resumeUrl);
          if (fileError) {
            currentErrors.push({ field: "resumeUrl", message: fileError });
          }
        } else {
          currentErrors.push({ field: "resumeUrl", message: "Invalid file uploaded." });
        }
      } else {
        currentErrors.push({ field: "resumeUrl", message: "Resume file is required." });
      }

    }

    if (step === 4) {
      setIsReview(true);
    }

    setErrors(currentErrors);
    console.log("Current Step:", step);
    console.log("Errors:", currentErrors);

    setIsFirstLoad(true)

    if (currentErrors.length === 0) {
      setStep((prev) => Math.min(prev + 1, 4));
    }

  }

  const getErrorMessage = (field: string) => {

    return errors.find((error) => error.field === field)?.message;
  };

  const hdlPrevStep = () => {
    setIsFirstLoad(false)
    setStep((prev) => Math.max(prev - 1, 1));
  }

  const updateFormData = (newData: Partial<FormDataType>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const renderStepPage = () => {

    if (step === 1) {
      return <Page1
        formData={formData}
        updateFormData={updateFormData}
        getErrorMessage={getErrorMessage}
        isFirstLoad={isFirstLoad}
      />
    }
    else if (step === 2) {
      return <Page2
        formData={formData}
        updateFormData={updateFormData}
        getErrorMessage={getErrorMessage}
        isFirstLoad={isFirstLoad}
      />
    }
    else if (step === 3) {
      return <Page3
        formData={formData}
        updateFormData={updateFormData}
        getErrorMessage={getErrorMessage}
        isFirstLoad={isFirstLoad}
      />
    }
    else if (step === 4) {
      return <ReviewForm
        formData={formData}
        isFirstLoad={isFirstLoad}
      />
    }
  }

  const submitFormData = async () => {
    setIsLoading(true);
    try {

      const formInputData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formInputData.append(key, value);
        } else {
          formInputData.append(key, String(value));
        }
      });


      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to submit this form?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {

        const resp = await axios.post("/api/form", formInputData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setIsLoading(false);

        toast.success(resp.data.message);
        resetFormInput(true);
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "Your form submission has been cancelled.",
          icon: "info",
          confirmButtonText: "OK",
        });
      }

    } catch (error) {
      toast.error('Error submitting form data');
    }
  }

  const resetFormInput = (isReset = true) => {

    setFormData({

      prefix: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      age: 0,
      address: "",
      education: "",
      experience: "",
      resumeUrl: null,
    })

    setErrors([]);
    setStep(1);
    setIsReview(false);


    if (!isReset) {
      localStorage.removeItem('formData');
      toast.success('Form has been reset!');
    }

  }

  const hdlResetForm = () => {
    try {

      Swal.fire({
        title: "Are you sure you want to reset the form?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reset form!"
      }).then((result) => {
        if (result.isConfirmed) {
          resetFormInput(false);
          Swal.fire({
            title: "Reset successful!",
            icon: "success"
          });
        }
      });

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {

    const savedFormData = localStorage.getItem('formData');

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    setIsFirstLoad(false);

  }, [])


  const saveFormDataTolocalStorage = () => {

    localStorage.setItem('formData', JSON.stringify(formData));
    toast.success('Data saved successfully!');

  }


  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-black">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
        <div className="flex justify-center relative">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {step < 4 ? "Multistep Form" : "Review Form"}
          </h1>

          <div>
            <Button onClick={hdlResetForm} title="Reset form" text={<RiResetLeftFill size={18} />} customize="absolute right-10 bg-red-500" />
            <Button onClick={saveFormDataTolocalStorage} title="Save form" text={<IoIosSave size={18} />} customize="absolute right-0 bg-green-500" />
          </div>

        </div>

        <div>
          {renderStepPage()}
        </div>
        {!isReview && (
          <div className="flex justify-between mt-4">
            {step && (
              <Button onClick={hdlPrevStep} text="Previous"
                customize={`bg-blue-500 ${step === 1 ? "bg-gray-400 cursor-not-allowed" : ""}`} disabled={step === 1} />
            )}
            {step === 4 ? (
              <Button onClick={submitFormData} text="Submit" customize="bg-green-500" />
            ) : (
              <Button onClick={hdlNextStep} text="Next" customize="bg-blue-500" />
            )}
          </div>
        )}
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="loader"></div>
            <p className="text-white mt-4">Sendind Form...</p>
          </div>
        </div>
      )}


    </div >
  );
}
