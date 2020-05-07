import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Star from "@material-ui/icons/Star";
import Group from "@material-ui/icons/Group";
import Pets from "@material-ui/icons/Pets";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk about our pet shelter</h2>
          <h5 className={classes.description}>
            Our mission is sharing human kindness all around the world by
            saving all the helpless pets we can. We do that by taking
            homeless pets into our shelter or to our foster families, making
            sure they are or are becoming healthy, training them and finally
            finding them permanent homes with loving families where they can
            get their happily ever after.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="We offer everything they need."
              description="We don't have the most expensive shelter, but our animals have
                everything they need! Beside that, the most important thing is
                the fact that they have our eternal love and someone to take
                care of them."
              icon={Star}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="A team that's united, friendly and focused."
              description="The love for animals unites us. Each one of us is doing
                everything we can to show the world that animals need to be
                treated as a family member."
              icon={Group}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Pets are part of our community."
              description="By taking care of homeless pets, less stray dogs and cats are
                wandering the streets and public spaces. The parks are now safer
                for the kids, even though apet is never a threat!"
              icon={Pets}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
