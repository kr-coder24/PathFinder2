import React, { useState } from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet,FlatList} from 'react-native';

export default function SearchBar({origin,onOriginChange,destination,onDestinationChange,onGetRoute}){
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const API_BASE_URL = 'http://10.0.2.2:8000';
    const fetchSuggestions = async (text,field) =>{
        if(text.length < 3){
            field == 'origin' ? setOriginSuggestions([]) : setDestinationSuggestions([]);
            return;
        }
        try{
            const response = await fetch(`${API_BASE_URL}/api/autocomplete?input_text=${encodeURIComponent(text)}`);
            const data = await response.json();
            if(data.predictions){
                const suggestions = data.predictions.map(p => ({id:p.place_id,description:p.description}));
                field == 'origin' ? setOriginSuggestions(suggestions) : setDestinationSuggestions(suggestions);
            }
        }catch(error){
            console.error("Error fetching suggestions: ",error);
        }
    };
    return(
        <View style={styles.searchContainer}>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="From"
                    placeholderTextColor="#999"
                    value={origin}
                    onChangeText={(text) =>{
                        onOriginChange(text);
                        fetchSuggestions(text,'origin');
                    }}
                />
                {originSuggestions.length > 0 &&(
                    <View style={styles.suggestionsContainer}>
                        <FlatList
                        data={originSuggestions}
                        keyExtractor={(item) => item.id}
                        renderItem={({item})=>(
                            <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={()=>{
                                onOriginChange(item.description);
                                setOriginSuggestions([]);
                            }}
                            >
                            <Text>{item.description}</Text>
                            </TouchableOpacity>
                        )}
                        />
                    </View>
                )}
            </View>

            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="To"
                    placeholderTextColor="#999"
                    value={destination}
                    onChangeText={(text) => {
                        onDestinationChange(text);
                        fetchSuggestions(text,'destination');
                    }}
                />
                {destinationSuggestions.length > 0 &&(
                    <View style={styles.suggestionsContainer}>
                        <FlatList
                        data={destinationSuggestions}
                        keyExtractor={(item) => item.id}
                        renderItem={({item})=>(
                            <TouchableOpacity
                            style={styles.suggestionItem}
                            onPress={()=>{
                                onDestinationChange(item.description);
                                setDestinationSuggestions([]);
                            }}
                            >
                            <Text>{item.description}</Text>
                            </TouchableOpacity>
                        )}
                        />
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={onGetRoute}>
                <Text style={styles.buttonText}>Get Route</Text>
            </TouchableOpacity>
        </View>
    );
}

 const styles = StyleSheet.create({
      searchContainer: {
        position: 'absolute',
        top: 120,
        left: 15,
        right: 15,
        zIndex: 5,
        backgroundColor: 'transparent',
      },
      inputWrapper: {
        marginBottom: 10,
      },
      input: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
      },
      suggestionsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 5,
        maxHeight: 200,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
      },
      button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    },
 });
