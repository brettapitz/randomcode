#pragma once
#include <iostream>
#include "actions.h"
#include <vector>
using namespace std;

// IDs will eventually be in an object info header, but this can stay here for
// now.
int playerID = 0;

struct inputBinding {
    char key;
    actionFunc action;
    inputBinding(char b, actionFunc f){
        key = b;
        action = f;
    }
};

// For now, changing a binding deletes any existing instance of the new key
// AND the new action, which means an action can't be bound to two buttons at
// once. This simplifies input handling a little, since there will never be
// duplicate actions in a frame, making us apply multiple attacks or jumps at
// once. This is an area, like handleInputs() below, that could possibly benefit
// from turning vec_inputBindings into a std::map.
void changeBindKey(char key, actionFunc action, vector<inputBinding> &vec_inputBindings) {
    for (int i = 0; i < vec_inputBindings.size(); i++ ) {
        if (vec_inputBindings[i].key == key) {
            vec_inputBindings.erase(vec_inputBindings.begin()+i);
        }
        if (vec_inputBindings[i].action == action) {
            vec_inputBindings.erase(vec_inputBindings.begin()+i);
        }
    }
    vec_inputBindings.push_back({key, action});
}

// Right now this just checks for button presses - none of the control logic is
// here. You can crouch and jump and attack all at the same time, you can jump
// on consecutive frames, etc.
void handleInputs(vector<inputBinding> &vec_inputBindings, vector<action> &vec_actions) {

    // For now I'm just using STDIN for testing. Actually querying the OS for inputs
    // is a topic for another day. I'm using the string function getline() because
    // cin >> inputBuffer doesn't preserve whitespace keys.
    string inputBuffer;
    getline(cin, inputBuffer);

    // The way I've chosen to do this checks every mapped button to see if it
    // appears in the inputBuffer. I'm uncertain if this is the best approach.
    // Most buttons will usually be unpressed, so this is a lot of wasted
    // conditional checks. I could alternatively store input mappings in a
    // std::map, and loop through inputBuffer chars to key into the map, but
    // the key would need to be checked with map.find() first, and duplicates
    // would need to be prevented, possibly by sorting and unique-ing the
    // inputBuffer. The tradeoffs seem like a wash, and I have no idea what
    // will be appropriate once actual input polling is used, so for now,
    // this is nice and clean and it'll do.
    for (auto inputBinding : vec_inputBindings) {
        if(inputBuffer.find(inputBinding.key) != string::npos) {
            vec_actions.push_back(action(inputBinding.action, playerID));
        }
    }
}
