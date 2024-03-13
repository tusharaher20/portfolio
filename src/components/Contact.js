import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";

export const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);

  // Please update the Access Key in the .env
  const apiKey =
    process.env.PUBLIC_ACCESS_KEY || "528633bb-1595-4562-9ff8-d8df0b15fa83";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Acme Inc",
      subject: "New Contact Message from your Website",
    },
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img src={contactImg} alt="Contact Us" />
          </Col>
          <Col md={6}>
            <div>
              <h2>Get In Touch </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="checkbox"
                  id=""
                  className="hidden"
                  style={{ display: "none" }}
                  {...register("botcheck")}
                ></input>

                <div className="mb-1">
                  <input
                    type="text"
                    placeholder="Full Name"
                    autoComplete="false"
                    className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${
                      errors.name
                        ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                        : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                    }`}
                    {...register("name", {
                      required: "Full name is required",
                      maxLength: 80,
                    })}
                  />
                  {errors.name && (
                    <div className="mt-1 text-red-600">
                      <small>{errors.name.message}</small>
                    </div>
                  )}
                </div>

                <div className="mb-1">
                  <input
                    type="email"
                    placeholder="Email Address"
                    autoComplete="false"
                    className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${
                      errors.email
                        ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                        : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                    }`}
                    {...register("email", {
                      required: "Enter your email",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="mt-1 text-red-600">
                      <small>{errors.email.message}</small>
                    </div>
                  )}
                </div>

                <div className="mb-1">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900   rounded-md outline-none  h-36 focus:ring-4  ${
                      errors.message
                        ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                        : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                    }`}
                    {...register("message", {
                      required: "Enter your Message",
                    })}
                  />
                  {errors.message && (
                    <div className="mt-1 text-red-600">
                      {" "}
                      <small>{errors.message.message}</small>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="contact form button py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black "
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block">Sending...</span>
                      {/* <svg
                        className="w-5 h-5 mx-auto text-white dark:text-black animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg> */}
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
            {isSubmitSuccessful && isSuccess && (
              <div className="mt-3 submitText  text-sm text-center text-green-500">
                {message || "Success. Message sent successfully"}
              </div>
            )}
            {isSubmitSuccessful && !isSuccess && (
              <div className="mt-3 submitText text-sm text-center text-red-500">
                {message || "Something went wrong. Please try later."}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};
