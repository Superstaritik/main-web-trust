import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../api/axiosClient";
import "../Css/NewsletterForm.css"; 

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post("/api/newsletter", data);
      alert("Subscribed!");
      reset();
    } catch (err) {
      alert("Subscription failed. Please try again.");
    }
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-left">
        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#project">Projects</a>
          <a href="#client">Testimonials</a>
          <a href="#home">Contact</a>
        </nav>
      </div>

      <div className="newsletter-right">
        <p>Subscribe Us</p>
        <form onSubmit={handleSubmit(onSubmit)} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter Email Address"
            {...register("email")}
          />
          <button type="submit">Subscribe</button>
        </form>
        {errors.email && (
          <p className="error">{errors.email.message}</p>
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;
