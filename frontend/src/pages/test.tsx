import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import Test from "../components/test";
import { BASE_URL } from "../config/utils";
import axios from "axios";
import { TableDemo } from "@/components/table";
import Describe from "@/components/describe";
import Faq from "@/components/faq";
import Rating from "@/components/rating";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { useAtom, useAtomValue } from "jotai";
import { filteredTest, searchAtom, testAtom } from "@/atom/atom";

interface Test {
  id: string
  title: string,
  totalQuestions: number,
  time: number
}

export default function Tests() {
  const [tests, setTests] = useAtom(testAtom);
  const filter = useAtomValue(filteredTest);
  const search = useAtomValue(searchAtom);
  const auth = useAuth();

  useEffect(() => {
    const main = async () => {
      const res = await axios.get(`${BASE_URL}/api/v1/test`);
      const newArr = res.data.tests.map((x: any) => {
        const hour: string = x.totalTimeHour > 0 ? x.totalTimeHour + " Hour" : "";
        const minute: string = x.totalTimeMinute > 0 ? x.totalTimeMinute + " Minute" : "";
        const second: string = x.totalTimeSecond > 0 ? x.totalTimeSecond + " Second" : "";
        const time = `${hour} ${minute} ${second}`;
        return {
          id: x.id,
          title: x.title,
          totalQuestions: x.totalQuestions,
          time,
        }
      });
      setTests(newArr);
    }
    main();
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <img
              className="h-12 w-12 rounded-lg"
              src="https://cdn.guidely.in/images/courses/163773953873.png"
              alt="IBPS PO Course"
            />
            <h1 className="font-bold text-xl sm:text-2xl text-gray-900 leading-tight">
              Descriptive Writing Test For IBPS PO Mains 2025
            </h1>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Want to ace the Descriptive Writing section of IBPS PO Mains 2025? Get ready with our Descriptive writing Mock Test for IBPS PO Mains 2025. The Descriptive paper in IBPS PO Mains covers essay writing and comprehension. Regular practice of essay writing on different important topics, along with comprehension exercises, will enhance your fast-reading and writing abilities. The total marks for the IBPS PO Descriptive paper are 25. To fetch maximum marks in this section, more practice is required. So, practice regularly using our Descriptive paper for IBPS PO mock test 2025 series. As a result, you can gain excellent typing skills and fast-reading ability. Additionally, it will help you to gain content knowledge of various key essay topics.
          </p>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <TableDemo />
        </div>

        {/* Key Points */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <div className="font-semibold text-gray-900">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                May be broadly based on Economic and Social issues, emerging trends in Banking and Technology, Current events, Ethics, etc.
              </li>
            </ul>
          </div>
        </div>

        {/* Description Sections */}
        <div className="space-y-6 mb-8">
          <Describe
            heading="Benefits of IBPS PO Descriptive Writing Test 2025"
            subHeading="Our expert-curated descriptive writing test will enhance your writing skills and make you exam-ready. Descriptive writing examples are provided too, with solutions to help the candidates get an idea of the descriptive writing for major bank exams. Candidates can learn how to write a structured essay and answer comprehension questions with these practice tests. The solutions are provided in a clear format of how the descriptive test answers should be. Succeed in the upcoming IBPS PO descriptive paper 2025 by preparing well with these descriptive writing tests. Practice now with the guidely's descriptive papers and score well."
          />
          <Describe
            heading="Features included in the IBPS PO Descriptive Test 2025"
            subHeading="Enhance your writing skills and learn new techniques to approach essay writing, and ensure your success by practicing with the questions given here. Here we have provided enough tests to make your descriptive writing for IBPS PO mains 2025 preparation a victorious one. Effective tips and tricks, and time management techniques can be learned by consistently preparing with this IBPS PO descriptive writing mock test. Utilize this descriptive paper test for exact exam-oriented preparation for the upcoming IBPS PO mains examination. Boost your confidence in the examination and enhance your time management skills."
          />
        </div>

        {/* Note Section */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
          <div className="font-semibold text-lg text-blue-900">
            Note: Descriptive Paper may be evaluated by an automated scoring mechanism for identifying features related to writing proficiency. This scoring mechanism is duly validated and evaluates the proficiency of test takers.
          </div>
        </div>

        {/* Descriptive Test Link */}
        <div className="text-center mb-8">
          <div className="inline-block text-blue-600 hover:text-blue-700 font-semibold text-xl cursor-pointer border-b-2 border-blue-600 hover:border-blue-700 transition-colors">
            Descriptive test
          </div>
        </div>

        {/* Tests Grid */}
        <div className="mb-12">
          <div className="grid gap-4">
            {search.length > 0 ?
              filter.map((test: any) => {
                return <Test
                  key={test.id}
                  id={test.id}
                  title={test.title}
                  questions={test.totalQuestions}
                  time={test.time}
                />
              })
              :
              tests.map((test: any) => (
                <Test
                  key={test.id}
                  id={test.id}
                  title={test.title}
                  questions={test.totalQuestions}
                  time={test.time}
                />
              ))

            }
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <h1 className="font-semibold text-2xl sm:text-3xl text-gray-900 mb-6">
            FAQs - IBPS PO Descriptive Writing Mock Test
          </h1>
          <div className="space-y-4">
            <Faq
              heading="1. What's included in the Descriptive Writing T#03989eest package for IBPS PO Mains?"
              subHeading="The package includes practice sets focused on descriptive writing, with sample PDFs available for each set. You also get 6 months of access, all exclusively available through our website."
            />
            <Faq
              heading="2. How can I access the Descriptive Writing Test package?"
              subHeading="You can access the package directly from our website. After purchasing, simply log in to your account and download the practice sets and sample PDFs."
            />
            <Faq
              heading="3. How long is the validity of the package?"
              subHeading="The package comes with a 6-month validity. You'll have full access to all materials for 6 months from the date of purchase."
            />
            <Faq
              heading="4. Can I access the Descriptive Writing Test package on mobile?"
              subHeading="Yes! The package is accessible on any device, including mobile and tablet, as long as you have internet access and a browser to visit our website."
            />
            <Faq
              heading="5. Is the Descriptive Writing Test package part of the Platinum Package?"
              subHeading="No, this package is separate and not included in the Platinum Package. It focuses exclusively on descriptive writing for IBPS PO Mains."
            />
            <Faq
              heading="6. What type of practice sets will I find in the package?"
              subHeading="The package includes practice sets designed to help you improve your writing skills for the IBPS PO Mains exam. These sets cover a range of topics, from essay writing to answering comprehension questions with answers." />
            <Faq
              heading="7. How can I use the sample PDFs to improve my writing?"
              subHeading="The sample PDFs contain examples of the writing tasks you might face in the exam. After attempting the exercises, you can compare your responses with the model answers to see how you can improve your structure, style, and language."
            />
            <Faq
              heading="8. Is this package suitable for beginners?"
              subHeading="Absolutely! The Descriptive Writing Test package is designed to cater to all levels. If you're a beginner, start with the basic practice sets and gradually challenge yourself with more advanced exercises."
            />
          </div>
        </div>

        {/* Rating Section */}
        <Rating />
      </div>
      <Footer />
    </div>
  );
}
