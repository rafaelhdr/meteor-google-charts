if (Meteor.isClient) {

  Meteor.startup(function () {

    chart = {
      target: 'chart1',
      type: 'BarChart',
      columns: [
        ['string', 'Topping'],
        ['number', 'Slices']
      ],
      rows: [
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ],
      options: {
        'title':'How Much Pizza I Ate Last Night',
        'width':400,
        'height':300
      }
    };

    drawChart(chart);

    chart2 = {
      target: 'chart2',
      type: 'Map',
      data: [
        ['Country', 'Population'],
        ['China', 'China: 1,363,800,000'],
        ['India', 'India: 1,242,620,000'],
        ['US', 'US: 317,842,000'],
        ['Indonesia', 'Indonesia: 247,424,598'],
        ['Brazil', 'Brazil: 201,032,714'],
        ['Pakistan', 'Pakistan: 186,134,000'],
        ['Nigeria', 'Nigeria: 173,615,000'],
        ['Bangladesh', 'Bangladesh: 152,518,015'],
        ['Russia', 'Russia: 146,019,512'],
        ['Japan', 'Japan: 127,120,000']
      ]
    };

    drawChart(chart2);

  });
}