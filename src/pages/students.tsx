import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { StudentView } from 'src/sections/students/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Students - ${CONFIG.appName}`}</title>
      </Helmet>
      <StudentView />
    </>
  );
}
