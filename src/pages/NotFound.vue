<template>
  <v-container class="d-flex">
    <v-row class="block text-center">
      <v-col cols="v-col-auto">
        <v-card-title class="text-h3 text-primary">Whoops, 404</v-card-title>
        <v-card-text>
          The page you were looking for does not exist
        </v-card-text>
        <v-btn color="primary" :to="{ name: 'home' }"> Go Home </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
