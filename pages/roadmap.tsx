import Head from "next/head";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "styles/roadmap.module.scss";

const steps = [
  {
    label: "Release Phase - 1 (COMPLETED!)",
    description:
      "Releasing the first set of 10,000 tokens called PsyDucks. We take inspiration from the legendary 1984 game Duck Hunt.",
  },
  {
    label: "Release Phase - 2 (COMPLETED!)",
    description:
      "Releasing the second set of 10,000 tokens. These tokens will also be part of Psyducks. In total Psyducks will be released in 2 phases",
  },
  {
    label: "Release Phase - 3 (COMPLETED!)",
    description:
      "Releasing our final set of 11,112 tokens called Unpsyned. Here we take inspiration from projects that use generative art. We firmly believe that generative art is beautiful in its own right.",
  },
  {
    label: "Release Phase - 4 (This will contain the lottery contract).",
    description:
      "Will contain the lottery contract. Which be released to the mainnet. The contract will have the ability to accept donations and will only allow the winners to withdraw money from the fund. With also contain a time constraint for the fund withdrawal. The winner will have 3 days to withdraw his / her funds and everyday that passes without withdrawal the winnings will reduce by 10% and at the end of day 3 the withdrawal will completely close at a minimum of 1%.",
  },
  {
    label: "Pay everyone back.",
    description:
      "Pay back the team and all of those who supported us from the beginning, for their time, dedication and effort towards the project.",
  },
  {
    label: "Make other people rich.",
    description:
      "Helping you make money makes us feel warm and fulfilled. We will take on no unnecessary overhead of developing a mobile game or making and selling merchandise. We are dedicated to helping you make some money so you can buy what pleases you. Dont buy our stupid hoodie - go buy a freaking lambo.",
  },
  {
    label: "Make donations to reputable charities.",
    description:
      "We will make sizable donation to honarable / reputed charities in the area. Because it is selfish to ignore the poor while we make all the money in the world.",
  },
  {
    label: "Take Inspiration",
    description:
      "We will take inspiration from other project in the web3 as well as web2 space to continue the project. We will not stop there, we will also take inspiration from countries and real world games each country has. This will bring excitement to community.",
  },
  {
    label: "Release 3 new collections every year.",
    description:
      "The plan is to maintain a sustainable business model. In order to refill the lotto pool every year we will release 3 new collections every year drawing inspiration from many different sources.",
  },
  {
    label: "Create a middle class / Lets all make money together.",
    description:
      "The idea is to create a middle class of sorts. At the moment 500 (top 1%) or so wallets make all the money trading NFTs and control the market - this is stupid. We want to cater to the bottom 99% of the people. We want to help them make money. Help them settle some debts. We want to provide a counter weight to the top 1%.",
  },
  {
    label: "Finally - Make the biggest payout in NFT history",
    description:
      "We want to help a lucky person make 10,000 ETH. This seems like a far-fetched goal, but we want to make it a reality. We want to repeatedly do it every year.",
  },
];

const RoadMap = () => {
  const [activeStep, setActiveStep] = React.useState(3);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setActiveStep(0);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Head>
        <title>Psy - Ducks</title>
        <meta
          name="description"
          content="Psy - The worlds first blockchain lottery"
        />
        <link rel="icon" href="/psyducks/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <section id="roadmap" className={styles.about}>
          <h1 className={styles.about_header}>Our 11 Step Programme</h1>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RoadMap;
