package Day15;

import java.io.File;
import java.util.Arrays;
import java.util.Scanner;

public class D15 {
    private static int size = 100;
    private static int[][] m = new int[size][size];
    private static int[][] n = new int[size][size];
    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day15/input");
        Scanner i = new Scanner(input);
        String t;
        for (int s = 0; s < size; s++) {
            t = i.next();
            for (int w = 0; w < size; w++) {
                m[s][w] = Character.getNumericValue(t.charAt(w));
            }
        }
        i.close();
        for (int s = 0; s < size; s++) {
            Arrays.fill(n[s], Integer.MAX_VALUE);
        }
        n[0][0] = 0;
        danger(0,0);
        System.out.println(n[size-1][size-1]);
    }
    static void danger(int a, int b) { 
        boolean[][] v = new boolean[size][size];
        v[0][0] = true;
        while (!v[size-1][size-1]) {
            if (a+1 < size && !v[a+1][b] && n[a][b] + m[a+1][b] < n[a+1][b]) {
                n[a+1][b] = n[a][b] + m[a+1][b];
            }
            if (b+1 < size && !v[a][b+1] && n[a][b] + m[a][b+1] < n[a][b+1]) {
                n[a][b+1] = n[a][b] + m[a][b+1];;
            }
            if (a-1 > -1 && !v[a-1][b] && n[a][b] + m[a-1][b] < n[a-1][b]) {
                n[a-1][b] = n[a][b] + m[a-1][b];
            }
            if (b-1 > -1 && !v[a][b-1] && n[a][b] + m[a][b-1] < n[a][b-1]) {
                n[a][b-1] = n[a][b] + m[a][b-1];
            }
            v[a][b] = true;
            if (a+1 >= size) {
                b++;
                a = 0;
            }
            else a++;
        }
    }
}
