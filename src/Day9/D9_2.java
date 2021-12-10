package Day9;

import java.io.File;
import java.util.Arrays;
import java.util.Scanner;

public class D9_2 {
    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day9/input");
        Scanner i = new Scanner(input);
        String tmp;
        int z, c;
        int[][] a = new int[2][200];
        int[] b = new int[3];
        boolean[][] m = new boolean[100][100];
        for (int s = 0; s < 100; s++) {
            tmp = i.nextLine();
            for (int w = 0; w < 100; w++) {
                if (Character.getNumericValue(tmp.charAt(w)) == 9) m[s][w] = true;
            }
        }
        i.close();
        do {
            c = 0;
            z = 0;
            Arrays.fill(a[0], -1);
            Arrays.fill(a[1], -1);
            while (a[0][0] == -1 || a[0][z] != -1) {
                while (a[0][0] == -1) {
                    if (!m[z][c]) {
                        m[z][c] = true;
                        a[0][0] = c;
                        a[1][0] = z;
                        c = 0;
                        z = 0;
                    }
                    if (c == 99) {
                        c = -1;
                        z++;
                    }
                    c++;
                }
                if (a[0][z]-1 > -1 && !m[a[0][z]-1][a[1][z]]) {
                    m[a[0][z]-1][a[1][z]] = true;
                    a[0][c] = a[0][z]-1;
                    a[1][c] = a[1][z];
                    c++;
                }
                if (a[0][z]+1 < 100 && !m[a[0][z]+1][a[1][z]]) {
                    m[a[0][z]+1][a[1][z]] = true;
                    a[0][c] = a[0][z]+1;
                    a[1][c] = a[1][z];
                    c++;
                }
                if (a[1][z]-1 > -1 && !m[a[0][z]][a[1][z]-1]) {
                    m[a[0][z]][a[1][z]-1] = true;
                    a[0][c] = a[0][z];
                    a[1][c] = a[1][z]-1;
                    c++;
                }
                if (a[1][z]+1 < 100 && !m[a[0][z]][a[1][z]+1]) {
                    m[a[0][z]][a[1][z]+1] = true;
                    a[0][c] = a[0][z];
                    a[1][c] = a[1][z]+1;
                    c++;
                }
                z++;
            }

            if (c > b[0]) b[0] = c;
            Arrays.sort(b);

            z = 0;
            for (int s = 0; s < 100; s++) {
                for (int w = 0; w < 100; w++) {
                    if (!m[s][w]) z++;
                }
            }
        } while (b[0] < z);
        System.out.println(b[0]);
        System.out.println(b[1]);
        System.out.println(b[2]);
        System.out.println(b[0]*b[1]*b[2]);
    }
}
