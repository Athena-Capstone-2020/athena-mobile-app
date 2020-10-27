import React from 'react'
import Svg, { Path } from "react-native-svg";

export const Home = ({ color }) => {
    return (
        <Svg width={27.91} height={27.735} viewBox="0 0 27.91 27.735">
            <Path
                d="M9.746 26.034v-4.24a2.029 2.029 0 012.091-1.96h4.223a2.164 2.164 0 011.479.574 1.9 1.9 0 01.613 1.386v4.24a1.636 1.636 0 00.523 1.2 1.865 1.865 0 001.279.5h2.88a5.243 5.243 0 003.589-1.386 4.6 4.6 0 001.488-3.36V10.909A3.356 3.356 0 0026.6 8.271L16.8.937a4.759 4.759 0 00-5.8.1L1.421 8.271A3.372 3.372 0 000 10.909v12.068a4.925 4.925 0 005.077 4.758h2.815a1.762 1.762 0 001.815-1.689z"
                fill={color}
            />
        </Svg>
    );
}

export const ContainerList = ({ color }) => {
    return (
        <Svg width={28} height={27} viewBox="0 0 28 27">
            <Path
                d="M3.556 0h4.732a3.5 3.5 0 013.556 3.457v4.6a3.5 3.5 0 01-3.556 3.456H3.556A3.5 3.5 0 010 8.06v-4.6A3.513 3.513 0 013.556 0zm0 15.484h4.732a3.5 3.5 0 013.556 3.457v4.6A3.5 3.5 0 018.288 27H3.556A3.513 3.513 0 010 23.544v-4.6a3.505 3.505 0 013.556-3.46zM24.444 0h-4.732a3.5 3.5 0 00-3.556 3.457v4.6a3.5 3.5 0 003.556 3.456h4.732A3.5 3.5 0 0028 8.06v-4.6A3.513 3.513 0 0024.444 0zm-4.732 15.484h4.732A3.505 3.505 0 0128 18.942v4.6A3.513 3.513 0 0124.444 27h-4.732a3.5 3.5 0 01-3.556-3.456v-4.6a3.5 3.5 0 013.556-3.46z"
                fill={color}
                fillRule="evenodd"
            />
        </Svg>
    );
}

export const AddItem = ({ color }) => {
    return (
        <Svg width={28} height={27} viewBox="0 0 28 27">
            <Path
                d="M7.462 0h13.062C25.284 0 28 2.592 28 7.2v12.6c0 4.576-2.7 7.2-7.462 7.2H7.462C2.688 27 0 24.381 0 19.8V7.2C0 2.592 2.688 0 7.462 0zm7.686 14.621h3.976a1.159 1.159 0 001.162-1.134 1.139 1.139 0 00-1.162-1.12h-3.976V8.559a1.163 1.163 0 00-2.324 0v3.807H8.862a1.238 1.238 0 00-.826.324 1.147 1.147 0 00-.336.8 1.159 1.159 0 001.162 1.134h3.962v3.82a1.163 1.163 0 002.324 0z"
                fill={color}
                fillRule="evenodd"
            />
        </Svg>
    );
}

export const GroceryList = ({ color }) => {
    return (
        <Svg width={28} height={27} viewBox="0 0 28 27">
            <Path
                d="M7.482 0h13.037C25.324 0 28 2.4 28 6.521v13.945C28 24.651 25.324 27 20.519 27H7.482C2.753 27 0 24.651 0 20.466V6.521C0 2.4 2.753 0 7.482 0zm.42 6.291v-.013h4.65a1.144 1.144 0 011.215 1.052 1.145 1.145 0 01-1.215 1.07H7.9a1.142 1.142 0 01-1.211-1.056A1.142 1.142 0 017.9 6.291zm0 8.208H20.1a1.143 1.143 0 001.213-1.053 1.144 1.144 0 00-1.213-1.054H7.9a1.143 1.143 0 00-1.213 1.054A1.142 1.142 0 007.9 14.5zm0 6.17H20.1a1.06 1.06 0 100-2.119H7.9a1.288 1.288 0 00-1.167.5.954.954 0 000 1.134 1.279 1.279 0 001.167.484z"
                fill={color}
                fillRule="evenodd"
            />
        </Svg>
    );
}

export const User = ({ color }) => {
    return (
        <Svg width={20.467} height={25.583} viewBox="0 0 20.467 25.583">
            <Path
                d="M17.005 6.768A6.772 6.772 0 1110.233 0a6.747 6.747 0 016.772 6.768zm-6.772 18.815C4.685 25.583 0 24.682 0 21.2s4.714-4.351 10.233-4.351c5.55 0 10.233.9 10.233 4.381s-4.714 4.353-10.233 4.353z"
                fill={color}
                fillRule="evenodd"
            />
        </Svg>
    );
}

export const Fridge = ({ color }) => {
    return (
        <Svg width={39.622} height={67.49} viewBox="0 0 39.622 67.49">
            <Path
                data-name="Path 34"
                d="M35.073 0H4.535A4.534 4.534 0 000 4.52v58.45a4.516 4.516 0 004.535 4.52h30.538a4.547 4.547 0 004.549-4.52V4.52A4.537 4.537 0 0035.073 0zm1.614 62.985a1.594 1.594 0 01-1.614 1.585H4.535a1.591 1.591 0 01-1.6-1.585v-35.1h33.752v35.1zm0-38.037H2.935V4.52a1.591 1.591 0 011.6-1.585h30.538a1.613 1.613 0 011.614 1.585z"
                fill={color}
            />
            <Path
                data-name="Path 35"
                d="M33.399 15.438a1.148 1.148 0 00-1.145 1.145v4.58a1.145 1.145 0 102.29 0v-4.58a1.148 1.148 0 00-1.145-1.145z"
                fill={color}
            />
            <Path
                data-name="Path 36"
                d="M33.401 37.772a1.15 1.15 0 001.147-1.147v-5.734a1.147 1.147 0 10-2.293 0v5.734a1.15 1.15 0 001.146 1.147z"
                fill={color}
            />
        </Svg>
    );
}

export const ArrowLeft = ({ color }) => {
    return(
        <Svg width={6.81} height={11.621} viewBox="0 0 6.81 11.621">
            <Path
                data-name="Path 3391"
                d="M5.75 1.06l-5 4.684 4.816 4.816"
                fill="none"
                stroke={color || "#111719"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                strokeDasharray="0 0"
            />
        </Svg>
    )
}

export const ArrowRight = ({ color }) => {
    return (
        <Svg width={6.81} height={11.621} viewBox="0 0 6.81 11.621">
            <Path
                data-name="Path 3391"
                d="M1.06 10.561l5-4.684-4.816-4.816"
                fill="none"
                stroke={color || "#111719"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                strokeDasharray="0 0"
            />
        </Svg>
    );
}

const Icon = ({ name, color }) => {
    switch(name) {
        case 'Home':            return <Home color={color} />
        case 'ContainerList':   return <ContainerList color={color} />
        case 'AddItem':         return <AddItem color={color} />
        case 'GroceryList':     return <GroceryList color={color} />
        case 'User':            return <User color={color} />
        case 'Fridge':          return <Fridge color={color} />
        case 'ArrowLeft':       return <ArrowLeft color={color} />
        case 'ArrowRight':      return <ArrowRight color={color} />
        default:                return null
    }
}

export default Icon;
