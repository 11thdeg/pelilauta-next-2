<script lang="ts" setup>
</script>

<template>
  <cyan-column class="double">
    <section>
      <h1>Stylebook</h1>
      <p>
        This page acts as a kind of a testing scaffold and a Diary for the UX and UI design for the app. Additionally, it is a
        very convinient way to test and document usage of UX/UI practices, tooling, components, and
        styles in the codebase.
      </p>

      <p>
        The Single Page App routing is created using <a href="https://router.vuejs.org/">Vue Router</a>, and all the
        views can be found from the default location <span class="code">@/views</span>
      </p>

      <p>The class declarations for view styles can be found in <span class="code">@/styles/views.sass</span></p>

      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="code">singleColumnLayout</span>
            </td>
            <td>A simple layout with a single, centered column of text.</td>
          </tr>
          <tr>
            <td>
              <span class="code">dashBoardLayout</span>
            </td>
            <td>A layout for dashboards. Arranges sections into rows of 3 items for desktop and tablet. (on mobile, acts like the <span class="code">singleColumnLayout</span>)</td>
          </tr>
          <tr>
            <td>
              <span class="code">emptyLayout</span>
            </td>
            <td>A layout filling 100% of the space with some padding.</td>
          </tr>
          <tr>
            <td>
              <span class="code">bookLayout</span>
            </td>
            <td>A layout with 2 sized columns. use class <span class="code">double</span> to get 2 columnns wide <span class="code">Column</span></td>
          </tr>
        </tbody>
      </table>
    </section>
  </cyan-column>
</template>