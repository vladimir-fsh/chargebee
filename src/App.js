import React, { useCallback, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import {
  CardComponent,
  CardNumber,
  CardExpiry,
  CardCVV
} from "@chargebee/chargebee-js-react-wrapper";

export default function App() {
  const cardRef = useRef();

  useEffect(() => {
    // the error I've got on that step
    // errors.ts:281 Uncaught (in promise) Error: Gateway configuration for currency: undefined unavailable

    window.Chargebee().init({
      site: "medicuja-test",
      publishableKey: "test_Zq5LA0cdbyLpYcugwtvVtdoCMblKBmOKhE"
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    const intent = "comesFromBackend";
    try {
      const authorizedPaymentIntent = await cardRef.current.authorizeWith3ds(
        intent
      );
      console.log(`intent`, authorizedPaymentIntent);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Formik>
      <Form onSubmit={handleSubmit}>
        <CardComponent ref={cardRef}>
          <CardNumber placeholder={"number"} />
          <CardExpiry placeholder={"MM/YY"} />
          <CardCVV placeholder={"CVV"} />
        </CardComponent>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
