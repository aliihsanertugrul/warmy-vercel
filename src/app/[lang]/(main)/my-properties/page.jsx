import Spacer from "@/components/common/misc/spacer";
import PageHeader from "@/components/common/page-header";
import MyAdvertsList from "@/components/my-adverts/my-adverts-list";
import { getAdvertsFromAuth } from "@/services/advert-service";
import React from "react";

const MyPropertiesPage = async ({ searchParams, params }) => {
  const { page } = searchParams;

  const res = await getAdvertsFromAuth(page);
  const data = await res.json();

  return (
    <div className="container">
      <PageHeader title="My Properties" />
      <Spacer />
      <MyAdvertsList data={data}/>
      <Spacer />
    </div>
  );
};

export default MyPropertiesPage;
