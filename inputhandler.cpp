#include <iostream>
#include <vector>
#include <string>
#include "actions.h"
#include "inputs.h"
using namespace std;



int main() {
    // Bindings are stored in vec_inputBindings, while vec_actions contains a
    // list of to-be-executed actions and object IDs. AI will also add to
    // vec_actions, so all actions, regardless of target object, can be
    // executed together.
    vector<inputBinding> vec_inputBindings;
    vector<action> vec_actions;

    // Eventually these bindings will be moved to an external file instead of
    // being hard-coded into source.
    vec_inputBindings.push_back(inputBinding(' ', actions::jump));
    vec_inputBindings.push_back(inputBinding('c', actions::crouch));
    vec_inputBindings.push_back(inputBinding('x', actions::attack));

    while(cin) {
        // First, the vec_actions needs to be reset (for now).
        // handleInputs() checks for button presses to determine which player
        // actions need to be executed. executeActions() then calls all
        // collected functions with their associated ObjectIDs.
        vec_actions.clear();
        handleInputs(vec_inputBindings, vec_actions);
        executeActions(vec_actions);
    }
}
