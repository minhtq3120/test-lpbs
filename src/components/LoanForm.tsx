import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { TextField, Button, Typography, Card } from "@mui/material";
import type { LoadFormData } from "@/types/loan";
import { calculateLoan, type CaculateLoanResponse } from "@/ultils/loan";
import { NumericFormat } from "react-number-format";
import { MAX_LOAN } from "@/ultils/constanst";
import BigNumber from "bignumber.js";

const LoanFormSchema = z.object({
  amount: z
    .string()
    .min(1, "Vui lòng nhập số tiền vay")
    .refine((val) => {
      if (!val) return false;
      return new BigNumber(val).gt(0);
    }, "Số tiền vay phải lớn hơn 0 VND")
    .refine((val) => {
      if (!val) return false;
      return new BigNumber(val).lte(MAX_LOAN);
    }, "Số tiền vay tối đa là 1000 tỷ VND"),

  rate: z.coerce.number().min(0.01, "Vui lòng nhập lãi suất lớn hơn 0%"),
  term: z.coerce
    .number()
    .int("Kỳ hạn phải là số nguyên")
    .min(1, "Vui lòng nhập kỳ hạn tối thiểu 1 tháng")
    .max(35, "Kỳ hạn vay tối đa là 35 tháng"),
});

const customeThemeInput = {
  "& .MuiInputBase-input": {
    color: "var(--text-rs)",
    fontWeight: "bold",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--text-rs)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--text-rs)",
  },
};

const LoanForm = ({
  setCal,
}: {
  setCal: (cal: CaculateLoanResponse) => void;
}) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(LoanFormSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      rate: "",
      term: "",
    },
  });

  const onSubmit = async (data: LoadFormData) => {
    const res = calculateLoan(data.amount, data.term, data.rate);
    setCal(res);
  };

  return (
    <Card className="p-6 shadow-lg">
      <Typography
        variant="h6"
        className="!mb-4 !font-bold text-[var(--text-rs)] !text-[16px]"
      >
        TÍNH TOÁN KHOẢN VAY THEO DƯ NỢ GỐC GIẢM DẦN
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 px-6"
      >
        <Controller
          name="amount"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <NumericFormat
              {...field}
              customInput={TextField}
              label="Số tiền vay (VND)"
              thousandSeparator={true}
              valueIsNumericString={true}
              onValueChange={(values) => {
                const rawValue = values.value;
                onChange(rawValue);
              }}
              error={!!errors.amount}
              helperText={errors?.amount?.message}
              fullWidth
              variant="standard"
              sx={{ ...customeThemeInput }}
            />
          )}
        />

        <Controller
          name="rate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Lãi suất vay (% / năm)"
              type="number"
              error={!!errors.rate}
              helperText={errors.rate?.message}
              fullWidth
              variant="standard"
              prefix="%"
              inputProps={{
                step: 0.01,
              }}
              sx={{ ...customeThemeInput }}
            />
          )}
        />

        <Controller
          name="term"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Thời hạn vay (tháng)"
              type="number"
              error={!!errors.term}
              helperText={errors.term?.message}
              fullWidth
              variant="standard"
              sx={{ ...customeThemeInput }}
            />
          )}
        />

        <div className="flex w-full justify-end">
          <Button
            variant="contained"
            type="submit"
            className="!bg-[var(--text-rs)] w-30 !text-[14px]"
          >
            Tính toán
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LoanForm;
