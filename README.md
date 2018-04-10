# flextable v1.1.2
A jQuery-Plugin to dynamically create lists from tables

## How to use

### Create a table

```
<table id='myTable'>
  <thead>
    <tr>
      <th>this</th>
      <th>is</th>
      <th>a</th>
      <th>table</th>
      <th>head</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>the</td>
      <td>first</td>
      <td>row</td>
      <td>of</td>
      <td>table</td>
    </tr>
    <tr>
      <td>the</td>
      <td>second</td>
      <td>row</td>
      <td>of</td>
      <td>table</td>
    </tr>
    <tr>
      <td>the</td>
      <td>third</td>
      <td>row</td>
      <td>of</td>
      <td>table</td>
    </tr>
  </tbody>
</table>
```

### Call the function

```
<script language='JavaScript' type='text/javascript'>
$(document).ready(function() {
  $('#myTable').flextable();
  });
</script>
```

### Get the list
```
<ul class='flextable-list' id='flextable-myTable'>
  <li class='flextable-head'>this</li>
  <li class='flextable-data'>the</li>
  <li class='flextable-head'>is</li>
  <li class='flextable-data'>first</li>
  .
  .
  .
  <li class='flextable-head'>table</li>
  <li class='flextable-data'>table</li>
</ul>

