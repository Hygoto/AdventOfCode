package Day04;
import java.util.Arrays;
import java.util.Scanner;
import java.io.File;

public class D4 {
    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day4/input");
        Scanner idraw = new Scanner(input).useDelimiter(",|\\n");
        Scanner i = new Scanner(input);
        int turns = 9999;
        int sum = 0;
        int[] c0 = new int[5];
        int[] c1 = new int[5];
        int[] c2 = new int[5];
        int[] c3 = new int[5];
        int[] c4 = new int[5];
        boolean[] c0b = new boolean[5];
        boolean[] c1b = new boolean[5];
        boolean[] c2b = new boolean[5];
        boolean[] c3b = new boolean[5];
        boolean[] c4b = new boolean[5];
        int[] draw = new int[100];
        for (int z = 0; z < 99; z++) draw[z] = idraw.nextInt();
        idraw.close();
        i.nextLine();
        while (i.hasNextLine()){
            Arrays.fill(c0b, false);
            Arrays.fill(c1b, false);
            Arrays.fill(c2b, false);
            Arrays.fill(c3b, false);
            Arrays.fill(c4b, false);
            for (int z = 0; z < 5; z++){
                c0[z] = i.nextInt();
                c1[z] = i.nextInt();
                c2[z] = i.nextInt();
                c3[z] = i.nextInt();
                c4[z] = i.nextInt();
            }
            for (int z = 0; z < 99; z++){
                for (int w = 0; w < 5; w++){
                    if (c0[w] == draw[z]) c0b[w] = true;
                    if (c1[w] == draw[z]) c1b[w] = true;
                    if (c2[w] == draw[z]) c2b[w] = true;
                    if (c3[w] == draw[z]) c3b[w] = true;
                    if (c4[w] == draw[z]) c4b[w] = true;
                }
                for (int w = 0; w < 5; w++){
                    if ((c0b[w] && c1b[w] && c2b[w] && c3b[w] && c4b[w]) || (c0b[0] && c0b[1] && c0b[2] && c0b[3] && c0b[4]) || (c1b[0] && c1b[1] && c1b[2] && c1b[3] && c1b[4]) || (c2b[0] && c2b[1] && c2b[2] && c2b[3] && c2b[4]) || (c3b[0] && c3b[1] && c3b[2] && c3b[3] && c3b[4]) || (c4b[0] && c4b[1] && c4b[2] && c4b[3] && c4b[4])){
                        if (z < turns){
                            turns = z;
                            sum = 0;
                            for (int y = 0; y < 5; y++){
                                if (!c0b[y]) sum += c0[y];
                                if (!c1b[y]) sum += c1[y];
                                if (!c2b[y]) sum += c2[y];
                                if (!c3b[y]) sum += c3[y];
                                if (!c4b[y]) sum += c4[y];
                            }
                        }
                        z = 99;
                        w = 5;
                    }
                }
            }
        }
        i.close();
        System.out.println("Turns: " + (turns+1));
        System.out.println("Last number: " + draw[turns]);
        System.out.println("Sum: " + sum);
        System.out.println(draw[turns]*sum);
    }
}
