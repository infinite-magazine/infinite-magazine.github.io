import { Link } from 'react-router-dom';
import '../css/aboutpage.css';

const AboutPage = () => {
  return (
    <div id="about">
      <div id="abouttext">
        Infinite is a student-run magazine seeking to
        reframe art, politics,
        culture, and aesthetics through the
        lens of fashion. It was
        launched in print and online in early 2018,
        with new issues released approximately once per
        semester. Each issue
        features full-page photo spreads and articles
        that are unified under the current issue’s
        theme. Infinite aims to provide the space,
        resources, and platform for student designers
        and writers to showcase their projects and experiments to the MIT
        community and beyond.
        <br /> <Link to='/'>BACK</Link>
      </div>
    </div>
  );
}

export default AboutPage;