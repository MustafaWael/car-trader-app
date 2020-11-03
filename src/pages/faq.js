import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  Accordion,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { mongodb_connect } from "../../utils";
import { Faq } from "../../models/models";

const faqPage = ({ faq }) => {
  return (
    <>
      {faq.map(({ _id, answer, question }) => (
        <Accordion key={_id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  mongodb_connect();
  const faq = await Faq.find({}, { __v: 0 });
  await new Promise((c) => {
    setTimeout(c, 1000);
  });
  return {
    props: { faq: JSON.parse(JSON.stringify(faq)) },
  };
};

export default faqPage;
