import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  TableContainer,
} from "@mui/material";
import { formatMoney } from "@/ultils/common";
import type { CaculateLoanResponse } from "@/ultils/loan";

export default function LoanTable({
  cal,
}: {
  cal: CaculateLoanResponse | null;
}) {
  return (
    <Card className="shadow-md">
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table
          sx={{
            "& th, & td": {
              textAlign: "center",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Tháng</TableCell>
              <TableCell>Tiền gốc mỗi kỳ (VND)</TableCell>
              <TableCell>Tiền gốc còn lại (VND)</TableCell>
              <TableCell>Lãi mỗi kỳ (VND)</TableCell>
              <TableCell>Tổng phải trả (VND)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cal?.result &&
              cal.result.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell>{formatMoney(row.principal)}</TableCell>
                  <TableCell>{formatMoney(row.remaining)}</TableCell>
                  <TableCell>{formatMoney(row.interest)}</TableCell>
                  <TableCell>{formatMoney(row.payment)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                <span className="text-[var(--text-rs)] font-bold">
                  Tổng cộng
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[var(--text-rs)] font-bold">
                  {cal ? formatMoney(cal.totalInterestPay) : 0} VND
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[var(--text-rs)] font-bold">
                  {cal ? formatMoney(cal.totalPay) : 0} VND
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
