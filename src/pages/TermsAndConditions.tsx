import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: 'By accessing and using our Rider/Driver Booking platform, you agree to comply with the following terms. Failure to comply may result in account suspension or termination.'
  },
  {
    id: 'user-responsibilities',
    title: 'User Responsibilities',
    content: ['Provide accurate personal and booking information.', 'Do not misuse the platform for illegal or harmful purposes.', 'Respect drivers, riders, and the community.']
  },
  {
    id: 'driver-responsibilities',
    title: 'Driver Responsibilities',
    content: ['Drive safely and responsibly.', 'Provide correct trip and fare information.', 'Follow platform rules and community standards.']
  },
  {
    id: 'rider-responsibilities',
    title: 'Rider Responsibilities',
    content: ['Enter accurate pickup and drop-off locations.', 'Be punctual and ready for the trip.', 'Make payments fairly and responsibly.']
  },
  {
    id: 'booking-cancellation',
    title: 'Booking & Cancellation Policy',
    content: 'Bookings can be canceled before being accepted. Once a booking is in status ACCEPTED, IN_TRANSIT, or COMPLETED, cancellation is not allowed.'
  },
  {
    id: 'account-termination',
    title: 'Account Termination',
    content: 'Accounts violating these terms may be suspended or terminated permanently at our discretion.'
  }
];

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-8 gap-8">

      {/* Sidebar Table-of-Contents */}
      <aside className="hidden lg:block w-64 sticky top-20 h-fit p-6 rounded-2xl border ">
        <h2 className="text-xl font-bold mb-4">Contents</h2>
        <ul className="space-y-3">
          {sections.map((sec, idx) => (
            <li key={sec.id}>
              <a href={`#${sec.id}`} className="flex items-center gap-2">
                <span className="font-semibold">{idx + 1}.</span> {sec.title}
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
            Terms & Conditions
          </h1>
          <p className="max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <Card key={section.id} id={section.id} className="border rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 space-y-4">
                <h2 className="text-2xl font-semibold  flex items-center gap-2">
                  <span className="">{idx + 1}.</span> {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul className="pl-6 space-y-2  ">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-foreground/70 ">{section.content}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div> 
      </main>

    </div>
  );
};

export default TermsAndConditions;
