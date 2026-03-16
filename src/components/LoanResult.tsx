import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import type { CaculateLoanResponse } from "@/ultils/loan";
import { formatMoney } from "@/ultils/common";

const LoanResult = ({ cal }: { cal: CaculateLoanResponse | null }) => {
  return (
    <Card className="p-6 shadow-md h-full flex flex-col justify-start">
      <Typography
        variant="h6"
        className="!font-bold text-[var(--text-rs)] !text-[16px]"
      >
        Kết quả
      </Typography>
      <div className="flex flex-col justify-start mt-6 gap-6">
        <div className="flex justify-start flex-col items-start">
          <Typography align="left">Tổng tiền lãi phải trả:</Typography>
          <span className="text-[var(--text-rs)] font-bold text-left text-xl break-all">
            {cal ? formatMoney(cal.totalInterestPay) : 0} VND
          </span>
        </div>

        <div className="flex justify-start flex-col items-start">
          <Typography align="left">Tổng tiền gốc và lãi phải trả:</Typography>
          <span className="text-[var(--text-rs)] font-bold text-left text-xl break-all">
            {cal ? formatMoney(cal.totalPay) : 0} VND
          </span>
        </div>
      </div>
    </Card>
  );
};
export default LoanResult;
