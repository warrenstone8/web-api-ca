import React from "react";
import PeopleCard from "../PeopleCard"; 
import Grid from "@mui/material/Grid";

const TemplatePeopleListPage = ({ title, people }) => {
  return (
    <>
      <h1>{title}</h1>
      <Grid container spacing={3}>
        {people.map((person) => (
          <Grid key={person.id} item xs={12} sm={6} md={4} lg={3}>
            <PeopleCard person={person} />  {}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TemplatePeopleListPage;
