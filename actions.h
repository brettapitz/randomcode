#pragma once
#include <iostream>
#include <vector>
using namespace std;

// Just a handful of functions for initial testing, but this list will grow
// much larger.
namespace actions {
    void jump(int x) { cout << x << " ^JUMPS^" << endl; }
    void crouch(int x) { cout << x << " _crouches_" << endl; }
    void attack(int x) { cout << x << " a-TTACKS!!!" << endl; }
}

// Function pointers are a pain in the ass to declare repeatedly, and anytime new
// params are added, they need to be changed everywhere. This defines actionFunc
// as an alias for void(*)(int).
typedef void(*actionFunc)(int);

// This struct defines a row in our actions-to-execute table. I think it will
// become bigger over time as I define actions::functions and need to add more
// parameters? Although maybe I'll store those parameters in a related table.
// Dunno yet.
struct action {
    actionFunc execute;
    int ID;
    action(actionFunc f, int i) {
        execute = f;
        ID = i;
    }
};

void executeActions(vector<action> &actions) {
    for (auto action : actions) {
        action.execute(action.ID);
    }
}
