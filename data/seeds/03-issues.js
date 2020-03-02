exports.seed = function(knex) {
      return knex('issues').insert([
        {title: 'Potholes', description: 'There is a huge pothole on Interstate 95. It blew out my tire!', location: 'Interstate 95 south, mile marker 421', user_id: 5, state_id: 21},
        {title: 'Construction', description: 'There has been construction going on outside my house for weeks. This needs to stop!', location: '456 Elm street, Winchester', user_id: 5, state_id: 21},
        {title: 'Parking', description: 'I can never make it to the farmer\'s market because there is never any parking spots. We need more parking!', location: 'Downtown Winchester', user_id: 5, state_id: 21},
        {title: 'Train issues', description: 'The train going into Boston is filthy. We really need someone to clean it periodically. I once sat on someone\'s leftover jelly donut. Ruined my new pants', location: '29 Waterfield Rd, Winchester, MA 01890', user_id: 5, state_id: 21},
        {title: 'Dirty Beach', description: 'There is so much litter on the Cape, it\'s disgraceful!', location: 'Cape Code', user_id: 4, state_id: 21},
        {title: 'Bad Ice Cream', description: 'I found multiple pieces of hair in my ice cream at Friendly\'s. I will never go again.', location: 'East Longmeadow', user_id: 4, state_id: 21},
        {title: 'Yankees Fans', description: 'I keep seeing Yankees fans around Boston. This can NOT happen!', location: 'Boston', user_id: 4, state_id: 21},
        {title: 'Salt on Roads', description: 'We need to stop putting salt on the roads everytime snow is in the forecast. It\'s going to turn my car into a rust bucket!', location: 'All roads everywhere.', user_id: 6, state_id: 21},
        {title: 'Gas Prices', description: 'The price of gas in the city is crazy! Can you say "monopoly"?', location: 'Boston', user_id: 6, state_id: 21},
        {title: 'Street Racing', description: 'I keep seeing the same group of cars racing down I95. So dangerous!!', location: 'Interstate 95 north, between mile markers 118 and 121 every friday night around 10pm', user_id: 4, state_id: 21},
        {title: 'Developments', description: 'There are too many new developments being built and too many of our trees are being cut down.', location: 'Concord', user_id: 6, state_id: 29},
        {title: 'Dirt Bikes', description: 'I have been seeing a lot of dirt bikes in places the shouldn\'t be. They are so loud!', location: 'Downtown Goffstown area', user_id: 5, state_id: 29},
        {title: 'State Inspection prices', description: 'My state inspection cost $50! They only cost $20 a few states over.', location: 'Everywhere', user_id: 6, state_id: 29},
        {title: 'Construction', description: 'Downtown Concord has been under construction for months and is a complete eyesore. When will they be done?!', location: 'Concord', user_id: 6, state_id: 29},
        {title: 'Snow Removal', description: 'The snow plows have been burying everyone\'s car in and it has caused me to be late to work 3 times now! Something needs to change.', location: 'Manchester', user_id: 6, state_id: 29},
        {title: 'No complaints', description: 'I just came here to just say that the fried chicken at the Puritan Backroom is delicious!', location: 'Manchester', user_id: 6, state_id: 29},
        {title: 'Bicycles', description: 'There needs to be more bicycle lanes downtown. I am too affraid to ride because cars never give me enough room', location: 'Manchester', user_id: 6, state_id: 29}
      ]);
};
