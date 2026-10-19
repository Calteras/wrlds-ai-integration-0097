import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
const PrivacyPolicy = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <PageLayout>
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: October 19, 2026</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 mb-4">
                At Calterras Technologies ("we," "our," or "us"), we respect
                your privacy and are committed to protecting your personal
                information. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website or use our services, including the SLM E-Presensi mobile
                application developed for Sarana Lintas Medika. The location
                disclosures below apply to SLM E-Presensi and its attendance and
                work-visit features.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-600 mb-4">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Contact us through our website</li>
                <li>Subscribe to our newsletter</li>
                <li>Register for our services</li>
                <li>Participate in our surveys or promotions</li>
              </ul>
              <p className="text-gray-600 mb-4">
                This information may include your name, email address, company
                name, phone number, and any other information you choose to
                provide.
              </p>
              <p className="text-gray-600 mb-4">
                In SLM E-Presensi, we also process employee account information,
                attendance and work-visit records, photos and supporting
                documents you submit, and device location as described below.
                Location records are associated with your employee account and,
                for route tracking, your registered tracking device and active
                visit session.
              </p>

              <h2 id="location-data" className="text-2xl font-semibold mt-8 mb-4">
                3. Location Data in SLM E-Presensi
              </h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">
                What location data we access and collect
              </h3>
              <p className="text-gray-600 mb-4">
                With your device&apos;s location permission, SLM E-Presensi
                accesses and collects your location, including precise GPS
                coordinates (latitude and longitude). Depending on your device
                settings, the operating system may provide approximate location
                instead. Visit route tracking requires precise location. The app
                records location with attendance or visit times and uses location
                updates to build a history of your route during an active visit
                session.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                Location while you use the app
              </h3>
              <p className="text-gray-600 mb-4">
                The app accesses your location when you use attendance, maps, or
                work-visit features. We use it to verify check-in and check-out
                locations, check whether you are within the designated office
                attendance area, record remote attendance and work visits, show
                your position on a map, and provide addresses and routes.
                Coordinates submitted with attendance and visit records are
                sent to the company&apos;s servers.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                Background location during work visits
              </h3>
              <p className="text-gray-600 mb-4">
                <strong>
                  SLM E-Presensi collects and transmits precise location to
                  enable real-time employee location tracking and route history
                  during an active work-visit session, even when the app is
                  closed or not in use.
                </strong>{" "}
                This allows authorized company administrators to monitor work
                visits and review the route taken. Before enabling this tracking,
                the app displays a disclosure and asks for your agreement, as
                well as foreground and background location permissions.
              </p>
              <p className="text-gray-600 mb-4">
                Background tracking stops when you successfully close the visit
                session, pause tracking from the home screen, or log out. When
                your device is offline, collected locations are buffered on the
                device and sent to the company&apos;s servers when a connection
                becomes available. Stopping tracking prevents new background
                location collection; it does not delete records already
                collected.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                Who receives location data
              </h3>
              <p className="text-gray-600 mb-4">
                Attendance, visit, and tracking locations are sent to Sarana
                Lintas Medika&apos;s servers and are available to authorized
                company administrators for attendance management and work-visit
                monitoring. The app uses Traccar software to send background
                tracking updates to the company&apos;s configured server.
              </p>
              <p className="text-gray-600 mb-4">
                When you use maps, address lookup, or route features, mapping
                providers, including LocationIQ and OpenStreetMap&apos;s
                Nominatim service, receive the coordinates or map-area requests
                needed to return maps, addresses, or directions. These providers
                process requests under their own privacy policies. The app uses
                location for the attendance, mapping, and work-visit functions
                described here, rather than advertising.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                Your location choices
              </h3>
              <p className="text-gray-600 mb-4">
                You can decline the background tracking disclosure by choosing
                &quot;Nanti&quot; (Later) and continue using other features
                without enabling background tracking. You can also change or
                revoke location permissions in your device settings at any time.
                Without the required location permissions, location-dependent
                attendance, maps, and visit tracking may be unavailable or
                limited. Background visit tracking requires &quot;Allow all the
                time&quot; or &quot;Always&quot; location access; permission to
                access location only while using the app does not enable it.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                4. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We may use the information we collect for various purposes,
                including to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-600">
                <li>Provide, operate, and maintain our services</li>
                <li>Improve, personalize, and expand our services</li>
                <li>Understand and analyze how you use our services</li>
                <li>
                  Develop new products, services, features, and functionality
                </li>
                <li>
                  Communicate with you about our services, updates, and other
                  information
                </li>
                <li>Process transactions and send related information</li>
                <li>Find and prevent fraud</li>
              </ul>
              <p className="text-gray-600 mb-4">
                The specific uses of SLM E-Presensi location data are described
                in Section 3 above.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-600 mb-4">
                We may use cookies and similar tracking technologies to track
                activity on our website and store certain information. Cookies
                are files with a small amount of data that may include an
                anonymous unique identifier. You can instruct your browser to
                refuse all cookies or to indicate when a cookie is being sent.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                6. Third-Party Services
              </h2>
              <p className="text-gray-600 mb-4">
                We may use third-party services that collect, monitor, and
                analyze data to improve our services. These third parties have
                their own privacy policies addressing how they use such
                information.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                7. Data Retention and Deletion
              </h2>
              <p className="text-gray-600 mb-4">
                We will retain your personal information only for as long as is
                necessary for the purposes set out in this Privacy Policy.
              </p>
              <p className="text-gray-600 mb-4">
                For SLM E-Presensi, this includes attendance, visit, and location
                records needed for your employer&apos;s attendance and work-visit
                administration and applicable recordkeeping obligations. Contact
                your company administrator for the retention period that applies
                to your employment records. You may request deletion of your
                personal information, including location records, through your
                company administrator or the privacy contact below. Requests are
                subject to applicable legal and employment recordkeeping
                requirements. Revoking location permission or uninstalling the
                app does not itself delete records held on company servers.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Security</h2>
              <p className="text-gray-600 mb-4">
                SLM E-Presensi sends attendance, visit, and background location
                data to the company&apos;s servers over HTTPS. Access to these
                records is intended for authorized company users administering
                attendance and work visits. Locations buffered for offline
                delivery are stored on the device until they can be transmitted.
              </p>
              <p className="text-gray-600 mb-4">
                The security of your data is important to us, but remember that
                no method of transmission over the Internet or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your personal
                information, we cannot guarantee its absolute security.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                9. Your Rights
              </h2>
              <p className="text-gray-600 mb-4">
                Depending on your location, you may have certain rights
                regarding your personal information, such as the right to
                access, correct, or delete your personal information.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 mb-4">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. We will let you know via email and/or a prominent
                notice on our website prior to the change becoming effective.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                11. Contact Us
              </h2>
              <p className="text-gray-600 mb-4">
                For questions about this Privacy Policy or requests to access,
                correct, or delete your personal information, contact Calterras
                Technologies at{" "}
                <a
                  href="mailto:hello@calterras.com"
                  className="text-blue-700 underline hover:text-blue-900"
                >
                  hello@calterras.com
                </a>
                . For SLM E-Presensi requests, please identify the app and your
                company so we can coordinate with the appropriate administrator.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
export default PrivacyPolicy;
