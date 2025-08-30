import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TableDemo() {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b-2 border-gray-200">
            <TableHead className="text-center text-lg font-bold text-gray-900 py-4">
              IBPS PO Mains Descriptive Test 2025
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-left font-semibold text-gray-700 py-3 px-4">Topics</TableHead>
            <TableHead className="text-center font-semibold text-gray-700 py-3 px-4">No of Questions</TableHead>
            <TableHead className="text-center font-semibold text-gray-700 py-3 px-4">Marks</TableHead>
            <TableHead className="text-center font-semibold text-gray-700 py-3 px-4">Medium of Exam</TableHead>
            <TableHead className="text-center font-semibold text-gray-700 py-3 px-4">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="text-left text-gray-700 py-3 px-4">
              Descriptive
              Paper* (Essay and
              Comprehension)
            </TableCell>
            <TableCell className="text-center text-gray-700 py-3 px-4 font-medium">
              02
            </TableCell>
            <TableCell className="text-center text-gray-700 py-3 px-4 font-medium">
              25
            </TableCell>
            <TableCell className="text-center text-gray-700 py-3 px-4 font-medium">
              English
            </TableCell>
            <TableCell className="text-center text-gray-700 py-3 px-4 font-medium">
              30 minutes
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
