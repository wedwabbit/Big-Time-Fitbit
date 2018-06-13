function Colours(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Font</Text>}>
        <Select
          settingsKey="myFont"
          label="Font"
          options={[
            {name:"BIG Again", value:"1"},
            {name:"SquareFace", value:"2"}
          ]}
        />  
      </Section>
      <Section
        title={<Text bold align="center">Date Display Timeout</Text>}>
        <Select
          settingsKey="myTimeout"
          label="Timeout"
          options={[
            {name: "1 second", value:"1"},
            {name: "2 seconds", value:"2"},
            {name: "5 seconds", value:"5"}
          ]}
        />  
      </Section>
      <Section
        title={<Text bold align="center">Foreground Colour</Text>}>
        <ColorSelect
          settingsKey="myForeground"
          colors={[
            {color: '#3BF7DE'}, 
            {color: '#000000'}, 
            {color: '#3182DE'}, 
            {color: '#8080FF'}, 
            {color: '#14D3F5'}, 
            {color: '#505050'}, 
            {color: '#303030'}, 
            {color: '#00A629'}, 
            {color: '#134022'}, 
            {color: '#5B4CFF'}, 
            {color: '#BCD8F8'}, 
            {color: '#A0A0A0'}, 
            {color: '#B8FC68'}, 
            {color: '#F80070'}, 
            {color: '#5BE37D'}, 
            {color: '#FC6B3A'}, 
            {color: '#FFCC33'}, 
            {color: '#F83478'}, 
            {color: '#A51E7C'}, 
            {color: '#BD4EFC'}, 
            {color: '#F83C40'}, 
            {color: '#7090B5'}, 
            {color: '#1B2C40'}, 
            {color: '#D828B8'}, 
            {color: '#FFFFFF'}, 
            {color: '#E4FA3C'},                                                                                                                              
            {color: '#394003'}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Background Colour</Text>}>
        <ColorSelect
          settingsKey="myBackground"
          colors={[
            {color: '#3BF7DE'}, 
            {color: '#000000'}, 
            {color: '#3182DE'}, 
            {color: '#8080FF'}, 
            {color: '#14D3F5'}, 
            {color: '#505050'}, 
            {color: '#303030'}, 
            {color: '#00A629'}, 
            {color: '#134022'}, 
            {color: '#5B4CFF'}, 
            {color: '#BCD8F8'}, 
            {color: '#A0A0A0'}, 
            {color: '#B8FC68'}, 
            {color: '#F80070'}, 
            {color: '#5BE37D'}, 
            {color: '#FC6B3A'}, 
            {color: '#FFCC33'}, 
            {color: '#F83478'}, 
            {color: '#A51E7C'}, 
            {color: '#BD4EFC'}, 
            {color: '#F83C40'}, 
            {color: '#7090B5'}, 
            {color: '#1B2C40'}, 
            {color: '#D828B8'}, 
            {color: '#FFFFFF'}, 
            {color: '#E4FA3C'},                                                                                                                              
            {color: '#394003'}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Colours);
