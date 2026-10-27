import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Social Edge",
  description: "Start a project with Social Edge. Tell us what you're working on and we'll reply within one business day.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <ContactForm />
    </main>
  );
}
