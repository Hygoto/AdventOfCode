package Day12;

import java.io.File;
import java.util.Arrays;
import java.util.Scanner;

public class D12_2 {

    private static int caves = 12;
    private static int p;
    private static int[][] m = new int[caves][9];
    private static boolean[][] v = new boolean[2][caves];
    private static boolean o = false;

    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day12/input");
        Scanner i = new Scanner(input).useDelimiter("-|\\n");
        String t;
        String[][] cave = new String[2][24];
        String[] z = new String[caves];
        int c = 0;

        // I took way too long converting the input.
        while (i.hasNextLine()) {
            t = i.next();
            cave[0][c] = t;
            t = i.next();
            cave[1][c] = t;
            c++;
        }
        i.close();
        v[0][0] = true;
        v[1][0] = true;
        int tmp = 1;
        for (int s = 0; s < c; s++) {
            if (!Arrays.stream(z).anyMatch(cave[0][s]::equals)) {
                if (cave[0][s].equals("start")) z[0] = cave[0][s];
                else if (cave[0][s].equals("end")) z[caves-1] = cave[0][s];
                else {
                    z[tmp] = cave[0][s];
                    if (Character.isLowerCase(z[tmp].charAt(0))) v[0][tmp] = true;
                    tmp++;
                }
            }
            if (!Arrays.stream(z).anyMatch(cave[1][s]::equals)) {
                if (cave[1][s].equals("start")) z[0] = cave[1][s];
                else if (cave[1][s].equals("end")) z[caves-1] = cave[1][s];
                else {
                    z[tmp] = cave[1][s];
                    if (Character.isLowerCase(z[tmp].charAt(0))) v[0][tmp] = true;
                    tmp++;
                }
            }
        }
        for (int s = 0; s < caves; s++) {
            Arrays.fill(m[s], -1);
        }
        for (int s = 0; s < caves; s++) {
            tmp = 0;
            for (int w = 0; w < c; w++) {
                if (z[s].equals(cave[0][w])) {
                    for (int q = 0; q < caves; q++) {
                        if (cave[1][w].equals(z[q])) {
                            m[s][tmp] = q;
                            tmp++;
                            break;
                        }
                    }
                }
                if (z[s].equals(cave[1][w])) {
                    for (int q = 0; q < caves; q++) {
                        if (cave[0][w].equals(z[q])) {
                            m[s][tmp] = q;
                            tmp++;
                            break;
                        }
                    }
                }
            }
        }
        // finally starting with the pathfinding
        System.out.println();
        int a = 0;
        p = 0;
        paths(a);
        System.out.println(p);
    }
    static void paths(int a) {
        boolean r = false;
        boolean e = false;
        for (int l = 0; l < caves; l++) {
            if (m[a][l] == caves-1) p++;
            else if (m[a][l] != -1) {
                if (!v[0][m[a][l]]) {
                    paths(m[a][l]);
                }
                else if (!v[1][m[a][l]]) {
                    v[1][m[a][l]] = true;
                    r = true;
                    paths(m[a][l]);
                }
                else if (!o && m[a][l] != 0) {
                    o = true;
                    e = true;
                    paths(m[a][l]);
                }
            }
            else break;
            if (r) {
                r = false;
                v[1][m[a][l]] = false;
            }
            if (e) {
                e = false;
                o = false;
            }
        }
    }
}
