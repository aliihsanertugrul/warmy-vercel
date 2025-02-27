import React from 'react';
import PageHeaderDetail from '@/components/advert-detail/advert-page-header/index.jsx';
import Spacer from '@/components/common/misc/spacer';
import AdvertDetail from '@/components/advert-detail/detail/advert-detail';
import ScheduleTour from '@/components/advert-detail/schedule/schedule';
import { getAdvertBySlug } from '@/services/advert-service';


const AdvertDetailPage =async ({params}) => {
  
const res=await getAdvertBySlug(params.slug)
const data=await res.json();
  
  return (
    <div className='container'>
        <PageHeaderDetail dataAdvert={data?.object}/>
        <Spacer height={34}/>
        <div className="row g-3">
          <div className="col-12 col-lg-9 order-2 order-lg-1">
            <AdvertDetail dataAdvert={data?.object}/>
          </div>
          <div className="col-12 col-lg-3 order-1 order-lg-2">
            <ScheduleTour advertId={data?.object?.id}/>
          </div>
        </div>
        <Spacer/>
    </div>
  )
}

export default AdvertDetailPage
