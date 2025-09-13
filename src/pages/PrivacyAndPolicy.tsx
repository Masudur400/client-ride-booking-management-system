import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "Introduction",
    content: "We are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when using our Rider/Driver Booking platform."
  },
  {
    title: "Data We Collect",
    content: "We collect the following data:\n\n- Name, email, phone number\n- Location data (for ride booking)\n- Booking history and preferences"
  },
  {
    title: "How We Use Data",
    content: "Your data is used to:\n\n- Manage and confirm bookings\n- Improve user experience\n- Ensure platform safety and security"
  },
  {
    title: "Data Protection",
    content: "All user data is stored securely and is not shared with third parties, except when legally required by authorities."
  },
  {
    title: "Cookies & Tracking",
    content: "We may use cookies to enhance platform performance and personalize your experience."
  },
  {
    title: "User Rights",
    content: "As a user, you have the right to:\n\n- Access your data\n- Update or delete your data\n- Withdraw consent at any time"
  },
  {
    title: "Changes to Privacy Policy",
    content: "We may update this Privacy Policy occasionally. Users will be notified of significant changes."
  }
];

const PrivacyAndPolicy = () => {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-8 gap-8"> 
      <aside className="hidden lg:block w-64 sticky top-20 h-fit  p-6 rounded-2xl border ">
        <h2 className="text-xl font-bold mb-4">Contents</h2>
        <ul className="space-y-3">
          {sections.map((section, idx) => (
            <li key={idx}>
              <a href={`#section-${idx}`} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500">
                <span className="font-semibold">{idx + 1}.</span> {section.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-12">

        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="text-2xl md:text-4xl font-medium">
            Privacy Policy
          </h1>
          <p className=" text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal data when using our Rider/Driver Booking platform.
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <Card
              key={idx}
              id={`section-${idx}`}
              className="border rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="">{idx + 1}.</span> {section.title}
                </h2>
                <p className=" text-foreground/70   whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </main>
    </div>
  );
};

export default PrivacyAndPolicy;
