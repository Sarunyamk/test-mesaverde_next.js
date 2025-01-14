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

export default function HomePage() {

  const [step, setStep] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const [errors, setErrors] = useState<ErrorType[]>([]);

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
    position: "",
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
      if (!formData.position || formData.position.trim() === "") {
        currentErrors.push({
          field: "position",
          message: "Position is required.",
        });
      }
    }

    if (step === 4) {
      setIsReview(true);
    }

    setErrors(currentErrors);
    console.log("Current Step:", step);
    console.log("Errors:", currentErrors);


    if (currentErrors.length === 0) {
      setStep((prev) => Math.min(prev + 1, 4));
    }

  }

  const getErrorMessage = (field: string) => {

    return errors.find((error) => error.field === field)?.message;
  };

  const hdlPrevStep = () => {
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
      />
    }
    else if (step === 2) {
      return <Page2
        formData={formData}
        updateFormData={updateFormData}
        getErrorMessage={getErrorMessage}
      />
    }
    else if (step === 3) {
      return <Page3
        formData={formData}
        updateFormData={updateFormData}
        getErrorMessage={getErrorMessage}
      />
    }
    else if (step === 4) {
      return <ReviewForm
        formData={formData}
      />
    }
  }

  const submitFormData = async () => {
    try {

      const formInputData = new FormData();

      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof FormDataType];

        if (value instanceof File) {
          formInputData.append(key, value);
        } else {
          formInputData.append(key, String(value));
        }
      });

      const resp = await axios.post("/api/form", formInputData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      toast.success('Form submitted successfully!');
      resetFormInput(true);


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
      position: "",
      resumeUrl: null,
    })

    setErrors([]);
    setStep(1);
    setIsReview(false);

    localStorage.removeItem('formData');

    if (!isReset) {
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

  }, [])

  const saveFormDataTolocalStorage = () => {

    localStorage.setItem('formData', JSON.stringify(formData));
    toast.success('Data saved successfully!');

  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-black">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <div className="flex justify-center relative">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {step < 4 ? "Multistep Form" : "Review Form"}
          </h1>

          <div>
            <Button onClick={hdlResetForm} title="Reset form" text={<RiResetLeftFill size={18} />} customize="absolute right-10 bg-red-500" />
            <Button onClick={saveFormDataTolocalStorage} title="Save form" text={<IoIosSave size={18} />} customize="absolute right-0 bg-green-500" />
          </div>

        </div>

        {renderStepPage()}
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
    </div >
  );
}
