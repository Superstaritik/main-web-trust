import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from '../api/axiosClient';
import "../Css/contactForm.css";

const contactSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  city: z.string().min(1, "City is required"),
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/api/contacts', data);
      alert('Contact form submitted!');
      reset();
    } catch (error) {
      alert('Submission failed. Try again.');
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Get a Free Consultation</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Full Name" {...register("fullName")} />
        {errors.fullName && <p className="error">{errors.fullName.message}</p>}

        <input placeholder="Enter Email Address" {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input placeholder="Mobile Number" {...register("mobile")} />
        {errors.mobile && <p className="error">{errors.mobile.message}</p>}

        <input placeholder="Area, City" {...register("city")} />
        {errors.city && <p className="error">{errors.city.message}</p>}

        <button type="submit">Get Quick Quote</button>
      </form>
    </div>
  );
};

export default ContactForm;
