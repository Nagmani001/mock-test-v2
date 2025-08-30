import Footer from "./footer";

export default function TermsAndCondition() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-10">
        {/* Terms Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900">
            Terms and Conditions
          </h1>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Welcome! By continuing to browse and use this website, you agree to comply
              with and be bound by the following terms and conditions, which, together
              with our privacy policy, govern your relationship with us.
            </p>

            <p>
              The term <strong>‘CA Raman Luthra’</strong>, <strong>‘us’</strong>, or{' '}
              <strong>‘we’</strong> refers to the website owner. The term <strong>‘you’</strong>{' '}
              refers to the user or viewer of our website.
            </p>

            <p>The use of this website is subject to the following terms:</p>

            <ul className="list-disc list-inside space-y-2">
              <li>The content of this website is for general information and use only. It is subject to change without notice.</li>
              <li>We do not guarantee the accuracy, timeliness, or completeness of the information provided.</li>
              <li>You acknowledge that information may contain errors; we exclude liability to the fullest extent permitted by law.</li>
              <li>Your use of any information or materials is at your own risk.</li>
              <li>Ensure any products, services, or information meet your specific requirements.</li>
              <li>Material on this website is owned by or licensed to us, including design, layout, and graphics.</li>
              <li>Reproduction is prohibited except in accordance with the copyright notice.</li>
              <li>All trademarks are acknowledged appropriately.</li>
              <li>Unauthorized use may result in legal claims or criminal offenses.</li>
              <li>Links to other websites are for convenience only and do not imply endorsement.</li>
              <li>Do not link to this website without prior consent. Use is governed by Indian law or relevant authorities.</li>
              <li>Credit Card orders are authorized upon confirmation from payment gateways.</li>
              <li>This app is for educational purposes only; no financial success is guaranteed.</li>
              <li>Skills and knowledge provided are for personal growth; no job or income assurance.</li>
              <li>Payments are non-refundable under any circumstances.</li>
              <li>You are responsible for how you use the skills learned; the app creators are not liable for outcomes.</li>
            </ul>

            <p className="font-semibold">
              By continuing to use the app, you accept and agree to these terms.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-gray-100 mt-auto">
        <Footer />
      </div>
    </div>
  );
}
